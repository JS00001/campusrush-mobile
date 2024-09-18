/*
 * Created on Sun Aug 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import * as Updates from "expo-updates";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

import AppConstants from "@/constants";

interface UpdateProviderProps {
  children: React.ReactNode;
}

const EASUpdateProvider: React.FC<UpdateProviderProps> = ({ children }) => {
  const appState = useRef(AppState.currentState);
  const { isUpdatePending } = Updates.useUpdates();

  /**
   * When the app moves from the background to the foreground
   */
  useEffect(() => {
    if (AppConstants.environment !== "production") return;

    const checkForUpdates = async (nextAppState: AppStateStatus) => {
      const regex = /inactive|background/;

      if (appState.current.match(regex) && nextAppState === "active") {
        Updates.fetchUpdateAsync();
      }

      appState.current = nextAppState;
    };

    // When the app first loads, check for updates
    Updates.fetchUpdateAsync();

    // When the app is moved to the foreground, check for updates
    const subscription = AppState.addEventListener("change", checkForUpdates);

    return () => {
      subscription.remove();
    };
  }, []);

  /**
   * When an update is pending, reload the app to apply the update
   */
  useEffect(() => {
    if (isUpdatePending) {
      Updates.reloadAsync();
    }
  }, [isUpdatePending]);

  return children;
};

export default EASUpdateProvider;

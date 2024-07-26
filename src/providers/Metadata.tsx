/*
 * Created on Wed Apr 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */
import { Linking, Alert } from "react-native";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect, useContext, createContext, useState } from "react";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import { Layout } from "@/ui/Layout";
import Headline from "@/ui/Headline";
import AppConstants from "@/constants";
import { useMetadataStore } from "@/store";
import { useGetMetadata } from "@/hooks/api/external";
import { getComparableVersion } from "@/lib/util/string";
import { usePreferences } from "@/providers/Preferences";

interface MetadataContextProps {
  isLoading: boolean;
  isValidVersion: boolean;
}

const MetadataContext = createContext<MetadataContextProps>(
  {} as MetadataContextProps,
);

const MetadataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const query = useGetMetadata();
  const { lastUpdateAlert, updatePreferences } = usePreferences();
  const setMetadata = useMetadataStore((state) => state.setMetadata);

  const [isValidVersion, setIsValidVersion] = useState(true);

  /**
   * When the metadata is loaded, check if the version is valid
   *
   * If the user's client version is less than the minimum client version, then their
   * API Calls wont work, so we need to force them to update
   *
   * If the user's client version is less than the latest client version, then we should
   * Give a 'gentle' reminder to update, and update their preferences to reflect that they
   * have seen the update alert
   */
  useEffect(() => {
    if (!query.data || "error" in query.data) return;

    const { version, latestVersion } = query.data.data;

    const minimumClientVersion = getComparableVersion(version || "0.0.0");
    const latestClientVersion = getComparableVersion(latestVersion || "0.0.0");
    const userVersion = getComparableVersion(AppConstants.version || "0.0.0");

    if (userVersion === 0 || minimumClientVersion === 0) {
      setIsValidVersion(true);
    }

    // If the user's client version is less than the minimum client version, then their
    // API Calls wont work, so we need to force them to update
    if (userVersion < minimumClientVersion) {
      setIsValidVersion(false);
      ExpoSplashScreen.hideAsync();
    }

    // If the user's client version is less than the latest client version, then we should
    // Give a 'gentle' reminder to update (not forceful)
    if (latestClientVersion > userVersion) {
      if (lastUpdateAlert == latestClientVersion) return;

      Alert.alert(
        "Update Available",
        "A new version of CampusRush is available! Update now to get the latest features and bug fixes.",
        [
          {
            text: "Maybe Later",
            style: "cancel",
          },
          {
            text: "Update",
            isPreferred: true,
            onPress: onUpdatePress,
          },
        ],
      );

      updatePreferences({ lastUpdateAlert: latestClientVersion });
    }

    setMetadata(query.data);
  }, [query.data]);

  /**
   * When the user presses the update button, open the app store
   * so they can update the app
   */
  const onUpdatePress = () => {
    Linking.openURL(AppConstants.appStoreUrl);
  };

  if (!isValidVersion) {
    return (
      <MetadataContext.Provider value={{ isLoading: true, isValidVersion }}>
        <Layout.Root>
          <Layout.Content contentContainerStyle={tw`justify-center`}>
            <Headline
              centerText
              title="Uh Oh, You're Behind..."
              subtitle="Update the app to the latest version to continue using CampusRush. Don't worry, we'll be here when you get back!"
            />
            <Button
              size="sm"
              color="secondary"
              iconRight="external-link-line"
              onPress={onUpdatePress}
            >
              Update App
            </Button>
          </Layout.Content>
        </Layout.Root>
      </MetadataContext.Provider>
    );
  }

  return (
    <MetadataContext.Provider
      value={{ isLoading: query.isLoading || !query.data, isValidVersion }}
    >
      {children}
    </MetadataContext.Provider>
  );
};

export const useMetadata = () => useContext(MetadataContext);

export default MetadataProvider;

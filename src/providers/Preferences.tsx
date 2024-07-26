/*
 * Created on Fri Oct 20 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

import AppConstants from "@/constants";

type Preferences = (typeof AppConstants)["preferences"];

interface PreferencesContextProps extends Preferences {
  /** Whether the preferences are loading */
  isLoading: boolean;
  /** Updates the preferences object */
  updatePreferences: (newPreferences: Partial<Preferences>) => void;
}

const PreferencesContext = createContext<PreferencesContextProps>(
  {} as PreferencesContextProps,
);

const PreferencesProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [preferences, setPreferences] = useState<Preferences>(
    AppConstants.preferences,
  );

  // On initial load, load preferences from async storage
  // If one doesnt exist, set its async storage value to the default value
  useEffect(() => {
    const loadPreferences = async () => {
      const asyncPreferences = await AsyncStorage.getItem("preferences");

      // If there are no preferences, set the default preferences
      if (!asyncPreferences) {
        await AsyncStorage.setItem(
          "preferences",
          JSON.stringify(AppConstants.preferences),
        );

        setPreferences(AppConstants.preferences);

        setIsLoading(false);
        return;
      }

      const parsedPreferences = JSON.parse(asyncPreferences);

      // Ensure that all preferences are present, if not, add the missing ones with their default values
      const newPreferences = { ...AppConstants.preferences };

      // Add any missing preferences
      for (const key in newPreferences) {
        if (!(key in parsedPreferences)) {
          parsedPreferences[key] = newPreferences[key as keyof Preferences];
        }
      }

      await AsyncStorage.setItem(
        "preferences",
        JSON.stringify(parsedPreferences),
      );

      setPreferences(parsedPreferences);
      setIsLoading(false);
    };

    loadPreferences();
  }, []);

  /**
   * Method to update the preferences object, and save it to async storage
   */
  const updatePreferences = async (newPreferences: Partial<Preferences>) => {
    setPreferences((preferences) => ({
      ...preferences,
      ...newPreferences,
    }));

    await AsyncStorage.setItem(
      "preferences",
      JSON.stringify({
        ...preferences,
        ...newPreferences,
      }),
    );
  };

  return (
    <PreferencesContext.Provider
      value={{
        ...preferences,
        isLoading,
        updatePreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);

export default PreferencesProvider;

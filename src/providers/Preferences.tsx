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

import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppConstants from "@/lib/constants";

/**
 * All locally stored user preferences with their types
 */
type Preferences = (typeof AppConstants)["preferences"];

interface PreferencesContextProps extends Preferences {
  /**
   * Whether the preferences are loading
   */
  isLoading: boolean;
  /**
   * Updates the preferences object
   */
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
      // Get preferences from async storage
      const asyncPreferences = await AsyncStorage.getItem("preferences");

      // If there are no preferences, set the default preferences
      if (!asyncPreferences) {
        await AsyncStorage.setItem(
          "preferences",
          JSON.stringify(AppConstants.preferences),
        );

        setPreferences(AppConstants.preferences);

        // Set loading to false
        setIsLoading(false);
        return;
      }

      // Parse the preferences from async storage
      const parsedPreferences = JSON.parse(asyncPreferences);

      // Ensure that all preferences are present, if not, add the missing ones with their default values
      const newPreferences = { ...AppConstants.preferences };

      // Add any missing preferences
      for (const key in newPreferences) {
        if (!(key in parsedPreferences)) {
          parsedPreferences[key] = newPreferences[key as keyof Preferences];
        }
      }

      // Update the preferences state
      setPreferences(parsedPreferences);

      // Save the preferences to async storage
      await AsyncStorage.setItem(
        "preferences",
        JSON.stringify(parsedPreferences),
      );

      // Set loading to false
      setIsLoading(false);
    };

    loadPreferences();
  }, []);

  /**
   * Method to update the preferences object
   */
  const updatePreferences = async (newPreferences: Partial<Preferences>) => {
    // Update the preferences state
    setPreferences((preferences) => ({
      ...preferences,
      ...newPreferences,
    }));

    // Save the preferences to async storage
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

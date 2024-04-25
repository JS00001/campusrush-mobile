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
import { Linking } from "react-native";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect, useContext, createContext, useState } from "react";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import { Layout } from "@/ui/Layout";
import Headline from "@/ui/Headline";
import AppConstants from "@/constants";
import { useMetadataStore } from "@/store";
import { stringifyVersion } from "@/lib/util/string";
import { useGetMetadata } from "@/hooks/api/external";

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
  const [isValidVersion, setIsValidVersion] = useState(true);

  const query = useGetMetadata();
  const setMetadata = useMetadataStore((state) => state.setMetadata);

  /**
   * When the metadata is loaded, check if the version is valid
   */
  useEffect(() => {
    if (!query.data || "error" in query.data) return;

    const validVersions = parseInt(
      stringifyVersion(query.data.data.version || "0.0.0"),
    );

    const currentVersion = parseInt(
      stringifyVersion(AppConstants.version || "0.0.0"),
    );

    if (currentVersion === 0 || validVersions === 0) {
      setIsValidVersion(true);
    }

    if (validVersions > currentVersion) {
      setIsValidVersion(false);
      ExpoSplashScreen.hideAsync();
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

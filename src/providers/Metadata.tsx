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

import semver from "semver";
import { Linking } from "react-native";
import { useEffect, useRef, useState } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import { alert } from "@/lib/util";
import { Layout } from "@/ui/Layout";
import Headline from "@/ui/Headline";
import AppConstants from "@/constants";
import { useGetMetadata } from "@/hooks/api/external";
import { usePreferences } from "@/providers/Preferences";

const MetadataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const query = useGetMetadata();
  const initialized = useRef(false);
  const [isValidVersion, setIsValidVersion] = useState(true);
  const { lastUpdateAlert, updatePreferences } = usePreferences();

  /**
   * When the metadata is loaded, check if the version is valid
   * and check if they need to update the app
   */
  useEffect(() => {
    if (!query.data || query.isError) return;

    // The app user's current version
    const currentUserVersion = AppConstants.version.split("-")[0];
    const minimumClientVersion = query.data.version;
    const latestClientVersion = query.data.latestVersion;

    // If the user's version is >= the min version, they are good to go
    if (semver.gte(currentUserVersion, minimumClientVersion)) {
      setIsValidVersion(true);
    }

    // If the user's version is less than the min version, they need to update
    if (semver.lt(currentUserVersion, minimumClientVersion)) {
      setIsValidVersion(false);
      ExpoSplashScreen.hideAsync();
      updatePreferences({ lastUpdateAlert: latestClientVersion });
      return;
    }

    // If the user's version is less than the latest version, we should alert them that an update is available
    if (semver.lt(currentUserVersion, latestClientVersion)) {
      // If we have already alerted the user about the update, then we don't need to alert them again
      if (semver.eq(lastUpdateAlert, latestClientVersion)) return;

      alert({
        title: "Update Available",
        message:
          "New version available! Update to get the latest features and fixes.",
        buttons: [
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
      });

      updatePreferences({ lastUpdateAlert: latestClientVersion });
    }
  }, [query.data]);

  /**
   * When the user presses the update button, open the app store
   * so they can update the app
   */
  const onUpdatePress = () => {
    Linking.openURL(AppConstants.appStoreUrl);
  };

  /**
   * On the first app load, we want to fetch this query if needed (if the user is loggedin)
   * then, we dont want to fetch it again (we only refresh the token once per app load)
   * so we keep track of it already being initialized
   */
  if (query.isLoading && !initialized.current) {
    initialized.current = true;
    return null;
  }

  if (!isValidVersion) {
    return (
      <Layout.Root>
        <Layout.Content contentContainerStyle={tw`justify-center`}>
          <Headline
            centerText
            title="Uh Oh, You're Behind..."
            subtitle="Update the app to the latest version to continue using CampusRush. Don't worry, we'll be here when you get back!"
          />
          <Button
            color="secondary"
            iconRight="ArrowSquareOut"
            onPress={onUpdatePress}
          >
            Update App
          </Button>
        </Layout.Content>
      </Layout.Root>
    );
  }

  return children;
};
export default MetadataProvider;

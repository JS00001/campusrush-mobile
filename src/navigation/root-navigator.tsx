/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import {
  useFonts,
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

import lodash from "lodash";
import { useEffect } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";

import {
  AuthStack,
  BillingStack,
  VerificationStack,
} from "@/navigation/stack-navigator";
import { useAuth } from "@/providers/Auth";
import useVersioning from "@/hooks/useVersioning";
import { usePreferences } from "@/providers/Preferences";
import { TabNavigator } from "@/navigation/tab-navigator";
import { useEntitlements } from "@/providers/Entitlements";

const RootNavigator = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const {
    isValidVersion,
    forceUpdateAlert,
    isLoading: isVersioningLoading,
  } = useVersioning();

  const { isLoading: isPreferencesLoading } = usePreferences();
  const { isLoading: isEntitlementsLoading } = useEntitlements();
  const { isLoading: isAuthLoading, organization, customerData } = useAuth();

  const shouldHideSplashScreen = () => {
    return (
      fontsLoaded &&
      !isAuthLoading &&
      !isPreferencesLoading &&
      !isEntitlementsLoading &&
      isValidVersion &&
      !isVersioningLoading
    );
  };
  // Hide the splash screen when the app is fully loaded
  useEffect(() => {
    if (shouldHideSplashScreen()) {
      ExpoSplashScreen.hideAsync();
    }
  }, [
    fontsLoaded,
    isAuthLoading,
    isPreferencesLoading,
    isEntitlementsLoading,
    isValidVersion,
    isVersioningLoading,
  ]);

  // If the user is not on the latest version, we show an alert
  useEffect(() => {
    if (!isValidVersion && !isVersioningLoading) {
      forceUpdateAlert();
    }
  }, [isValidVersion, isVersioningLoading]);

  // If the user is loading, we can't render the app
  if (isAuthLoading && lodash.isEmpty(organization)) return null;

  // If the fonts are not loaded or the user is loading, we can't render the app
  if (!fontsLoaded || isAuthLoading) return null;

  // If the user is not logged in, we show the AuthStack
  if (lodash.isEmpty(organization)) return <AuthStack />;

  // If the user is not verified, we show the VerificationStack
  if (!organization?.verified) return <VerificationStack />;

  // If the user has no active entitlements, we show the BillingStack
  if (lodash.isEmpty(customerData?.entitlements?.active))
    return <BillingStack />;

  // If the user is logged in and verified, we show the TabNavigator
  // (the main app)
  return <TabNavigator />;
};

export default RootNavigator;

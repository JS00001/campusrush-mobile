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

import { useAuth } from "@/providers/Auth";
import {
  AuthStack,
  BillingStack,
  VerificationStack,
} from "@/navigation/stack-navigator";
import { TabNavigator } from "@/navigation/tab-navigator";

const RootNavigator = () => {
  const { isLoading, organization } = useAuth();
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  // Hide the splash screen when the app is fully loaded
  useEffect(() => {
    if (fontsLoaded && !isLoading) ExpoSplashScreen.hideAsync();
  }, [fontsLoaded, isLoading]);

  // If the user is loading, we can't render the app
  if (isLoading && lodash.isEmpty(organization)) return null;

  // If the fonts are not loaded or the user is loading, we can't render the app
  if (!fontsLoaded || isLoading) return null;

  return <BillingStack />;

  // If the user is not logged in, we show the AuthStack
  if (lodash.isEmpty(organization)) return <AuthStack />;

  // If the user is not verified, we show the VerificationStack
  if (!organization?.verified) return <VerificationStack />;

  // If the user is logged in and verified, we show the TabNavigator
  // (the main app)
  return <TabNavigator />;
};

export default RootNavigator;

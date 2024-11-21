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
import { useUser } from "@/providers/User";
import { usePreferences } from "@/providers/Preferences";
import { AppNavigator } from "@/navigation/app-navigator";
import { useQonversion } from "@/providers/external/Qonversion";

const RootNavigator = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const { chapter, user } = useUser();
  const { entitlements } = useQonversion();
  const { isLoading: isPreferencesLoading } = usePreferences();

  const shouldHideSplashScreen = () => {
    return fontsLoaded && !isPreferencesLoading;
  };

  // Hide the splash screen when the app is fully loaded
  useEffect(() => {
    if (shouldHideSplashScreen()) {
      ExpoSplashScreen.hideAsync();
    }
  }, [chapter, fontsLoaded, isPreferencesLoading]);

  // If the user is not logged in, we show the AuthStack
  if (lodash.isEmpty(chapter) || lodash.isEmpty(user)) return <AuthStack />;

  // If the user is not verified, we show the VerificationStack
  if (!user.verified) return <VerificationStack />;

  // If the user has no active entitlements, we show the BillingStack
  if (lodash.isEmpty(entitlements)) return <BillingStack />;

  // If the user is logged in and verified, we show the main app
  return <AppNavigator />;
};

export default RootNavigator;

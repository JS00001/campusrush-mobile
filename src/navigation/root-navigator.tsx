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
import { isLoggedIn } from "@/lib/auth";
import { useUser } from "@/providers/User";
import { useMetadata } from "@/providers/Metadata";
import { usePreferences } from "@/providers/Preferences";
import { AppNavigator } from "@/navigation/app-navigator";
import { useQonversion } from "@/providers/external/Qonversion";

const RootNavigator = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const isAuthed = isLoggedIn();
  const { chapter } = useUser();
  const { entitlements } = useQonversion();
  // PR_TODO: clean up?
  const { isLoading: isMetadataLoading } = useMetadata();
  const { isLoading: isPreferencesLoading } = usePreferences();

  const shouldHideSplashScreen = () => {
    return fontsLoaded && !isPreferencesLoading && !isMetadataLoading;
  };

  // Hide the splash screen when the app is fully loaded
  useEffect(() => {
    if (shouldHideSplashScreen()) {
      ExpoSplashScreen.hideAsync();
    }
  }, [chapter, fontsLoaded, isPreferencesLoading, isMetadataLoading]);

  // If the user is not logged in, we show the AuthStack
  if (!isAuthed) return <AuthStack />;

  // If the user is not verified, we show the VerificationStack
  if (!chapter.verified) return <VerificationStack />;

  // If the user has no active entitlements, we show the BillingStack
  if (lodash.isEmpty(entitlements)) return <BillingStack />;

  // If the user is logged in and verified, we show the main app
  return <AppNavigator />;
};

export default RootNavigator;

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

import { useEffect } from "react";
import * as ExpoSplashScreen from "expo-splash-screen";
import { AuthStack } from "@/navigation/stack-navigator";

const RootNavigator = () => {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) ExpoSplashScreen.hideAsync();
  }, [fontsLoaded]);

  // If the fonts are not loaded, we can't render the app
  if (!fontsLoaded) return null;

  return <AuthStack />;
};

export default RootNavigator;

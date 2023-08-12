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

import { registerRootComponent } from "expo";
import * as ExpoSplashScreen from "expo-splash-screen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { startNetworkLogging } from "react-native-network-logger";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import queryClient from "@/lib/queryClient";
import RootNavigator from "@/navigation/root-navigator";
import NavigationProvider from "@/providers/NavigationProvider";
import DevEnvironmentProvider from "@/providers/DevEnvironmentProvider";
import { QueryClientProvider } from "@tanstack/react-query";

ExpoSplashScreen.preventAutoHideAsync();

if (__DEV__) startNetworkLogging();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <DevEnvironmentProvider>
              <RootNavigator />
            </DevEnvironmentProvider>
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </NavigationProvider>
    </QueryClientProvider>
  );
};

registerRootComponent(App);

export default App;

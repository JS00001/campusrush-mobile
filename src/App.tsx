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
import Toast from "react-native-toast-message";
import * as ExpoSplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { startNetworkLogging } from "react-native-network-logger";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import queryClient from "@/lib/queryClient";
import AuthProvider from "@/providers/Auth";
import AxiosIntercepter from "@/providers/Axios";
import PurchasesProvider from "@/providers/Purchases";
import RootNavigator from "@/navigation/root-navigator";
import NavigationProvider from "@/providers/Navigation";
import DevEnvironmentProvider from "@/providers/DevEnvironment";

// Prevent native splash screen from autohiding
// when app/component is mounted
ExpoSplashScreen.preventAutoHideAsync();

// If we are in development mode, start network logging
// Can be shown by shaking the device
if (__DEV__) startNetworkLogging();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PurchasesProvider>
        <AuthProvider>
          <AxiosIntercepter>
            <NavigationProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                  <DevEnvironmentProvider>
                    <RootNavigator />
                    <Toast />
                  </DevEnvironmentProvider>
                </BottomSheetModalProvider>
              </GestureHandlerRootView>
            </NavigationProvider>
          </AxiosIntercepter>
        </AuthProvider>
      </PurchasesProvider>
    </QueryClientProvider>
  );
};

// Register the root component
// This is the main component that is mounted
registerRootComponent(App);

export default App;

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

import toastConfig from "@/lib/toast";
import Modals from "@/components/Modals";
import queryClient from "@/lib/queryClient";
import AuthProvider from "@/providers/Auth";
import AxiosIntercepter from "@/providers/Axios";
import PurchasesProvider from "@/providers/Purchases";
import RootNavigator from "@/navigation/root-navigator";
import NavigationProvider from "@/providers/Navigation";
import DevEnvironment from "@/components/DevEnvironment";
import BottomSheetProvider from "@/providers/BottomSheet";
import PreferencesProvider from "@/providers/Preferences";
import EntitlementsProvider from "@/providers/Entitlements";
import NotificationsProvider from "@/providers/Notifications";

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
            <PreferencesProvider>
              <NavigationProvider>
                <NotificationsProvider>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <BottomSheetModalProvider>
                      <BottomSheetProvider>
                        <EntitlementsProvider>
                          <Modals />
                          <DevEnvironment />
                          <RootNavigator />
                          <Toast config={toastConfig} />
                        </EntitlementsProvider>
                      </BottomSheetProvider>
                    </BottomSheetModalProvider>
                  </GestureHandlerRootView>
                </NotificationsProvider>
              </NavigationProvider>
            </PreferencesProvider>
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

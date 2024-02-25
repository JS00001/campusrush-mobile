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
import Modals from "@/providers/Modal";
import ModalsV1 from "@/components/Modalsv1";
import queryClient from "@/lib/queryClient";
import AuthProvider from "@/providers/Auth";
import PurchasesProvider from "@/providers/IAP";
import AxiosIntercepter from "@/providers/Axios";
import AxiosV1Intercepter from "@/providers/Axiosv1";
import WebsocketProvider from "@/providers/Websocket";
import RootNavigator from "@/navigation/root-navigator";
import NavigationProvider from "@/providers/Navigation";
import SentryProvider from "@/providers/external/Sentry";
import DevEnvironment from "@/components/DevEnvironment";
import BottomSheetProvider from "@/providers/BottomSheet";
import PreferencesProvider from "@/providers/Preferences";
import PosthogProvider from "@/providers/external/Posthog";
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
    <SentryProvider>
      <QueryClientProvider client={queryClient}>
        <PurchasesProvider>
          <WebsocketProvider>
            <AuthProvider>
              <NavigationProvider>
                <AxiosIntercepter>
                  <AxiosV1Intercepter>
                    <PreferencesProvider>
                      <PosthogProvider>
                        <NotificationsProvider>
                          <GestureHandlerRootView style={{ flex: 1 }}>
                            <BottomSheetModalProvider>
                              <BottomSheetProvider>
                                <EntitlementsProvider>
                                  <Modals />
                                  <ModalsV1 />
                                  <DevEnvironment />
                                  <RootNavigator />
                                  <Toast config={toastConfig} />
                                </EntitlementsProvider>
                              </BottomSheetProvider>
                            </BottomSheetModalProvider>
                          </GestureHandlerRootView>
                        </NotificationsProvider>
                      </PosthogProvider>
                    </PreferencesProvider>
                  </AxiosV1Intercepter>
                </AxiosIntercepter>
              </NavigationProvider>
            </AuthProvider>
          </WebsocketProvider>
        </PurchasesProvider>
      </QueryClientProvider>
    </SentryProvider>
  );
};

// Register the root component
// This is the main component that is mounted
registerRootComponent(App);

export default App;

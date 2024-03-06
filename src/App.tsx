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
import Qonversion from "react-native-qonversion";
import * as ExpoSplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { startNetworkLogging } from "react-native-network-logger";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import toastConfig from "@/lib/toast";
import Modals from "@/providers/Modal";
import queryClient from "@/lib/queryClient";
import AuthProvider from "@/providers/Authv1";
import qonversionConfig from "@/lib/qonversion";
import PurchasesProvider from "@/providers/IAP";
import AxiosIntercepter from "@/providers/Axios";
import WebsocketProvider from "@/providers/Websocket";
import StatusOverlay from "@/components/StatusOverlay";
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

// Start network logging no matter what
// Visible by shaking the screen in dev mode, or the admin panel
// in production
startNetworkLogging();

// Now, we need to initialize the qonversion SDK
// so we can handle in-app purchases
Qonversion.initialize(qonversionConfig);

const App = () => {
  return (
    <SentryProvider>
      <QueryClientProvider client={queryClient}>
        <PurchasesProvider>
          <WebsocketProvider>
            <AuthProvider>
              <NavigationProvider>
                <AxiosIntercepter>
                  <PreferencesProvider>
                    <PosthogProvider>
                      <NotificationsProvider>
                        <GestureHandlerRootView style={{ flex: 1 }}>
                          <BottomSheetModalProvider>
                            <BottomSheetProvider>
                              <EntitlementsProvider>
                                <Modals />
                                <DevEnvironment />
                                <RootNavigator />
                                <StatusOverlay />
                                <Toast config={toastConfig} />
                              </EntitlementsProvider>
                            </BottomSheetProvider>
                          </BottomSheetModalProvider>
                        </GestureHandlerRootView>
                      </NotificationsProvider>
                    </PosthogProvider>
                  </PreferencesProvider>
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

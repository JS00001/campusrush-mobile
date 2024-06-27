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

import "react-native-console-time-polyfill";
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
import AuthProvider from "@/providers/Auth";
import qonversionConfig from "@/lib/qonversion";
import AxiosIntercepter from "@/providers/Axios";
import NetworkProvider from "@/providers/Network";
import DeveloperTools from "@/components/DevTools";
import MetadataProvider from "@/providers/Metadata";
import WebsocketProvider from "@/providers/websocket";
import StatusOverlay from "@/components/StatusOverlay";
import RootNavigator from "@/navigation/root-navigator";
import NavigationProvider from "@/providers/Navigation";
import QonversionProvider from "@/providers/Qonversion";
import SentryProvider from "@/providers/external/Sentry";
import BottomSheetProvider from "@/providers/BottomSheet";
import PreferencesProvider from "@/providers/Preferences";
import PosthogProvider from "@/providers/external/Posthog";

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
      <NetworkProvider>
        <QueryClientProvider client={queryClient}>
          <MetadataProvider>
            <QonversionProvider>
              <WebsocketProvider>
                <AuthProvider>
                  <NavigationProvider>
                    <AxiosIntercepter>
                      <PreferencesProvider>
                        <PosthogProvider>
                          <GestureHandlerRootView style={{ flex: 1 }}>
                            <BottomSheetModalProvider>
                              <BottomSheetProvider>
                                <Modals />
                                <DeveloperTools />
                                <RootNavigator />
                                <StatusOverlay />
                              </BottomSheetProvider>
                            </BottomSheetModalProvider>

                            {/* We need the toast outside of the bottom sheet modal provider so it shows up on top of bottom sheets */}
                            <Toast config={toastConfig} />
                          </GestureHandlerRootView>
                        </PosthogProvider>
                      </PreferencesProvider>
                    </AxiosIntercepter>
                  </NavigationProvider>
                </AuthProvider>
              </WebsocketProvider>
            </QonversionProvider>
          </MetadataProvider>
        </QueryClientProvider>
      </NetworkProvider>
    </SentryProvider>
  );
};

// Register the root component
// This is the main component that is mounted
registerRootComponent(App);

export default App;

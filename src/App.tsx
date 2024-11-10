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
import * as ExpoSplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { startNetworkLogging } from "react-native-network-logger";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import toastConfig from "@/lib/toast";
import queryClient from "@/lib/query-client";
import AuthProvider from "@/providers/Auth";
import UserProvider from "@/providers/User";
import NetworkProvider from "@/providers/Network";
import MetadataProvider from "@/providers/Metadata";
import WebsocketProvider from "@/providers/Websocket";
import EASUpdateProvider from "@/providers/EASUpdate";
import RootNavigator from "@/navigation/root-navigator";
import NavigationProvider from "@/providers/Navigation";
import SentryProvider from "@/providers/external/Sentry";
import BottomSheetProvider from "@/providers/BottomSheet";
import PreferencesProvider from "@/providers/Preferences";
import PosthogProvider from "@/providers/external/Posthog";
import QonversionProvider from "@/providers/external/Qonversion";
import GestureDetectorProvider from "@/providers/GestureDetector";
import StatusOverlay from "./components/Overlays/Status";

// Prevent native splash screen from autohiding
// when app/component is mounted
ExpoSplashScreen.preventAutoHideAsync();

// Start network logging no matter what
// Visible by shaking the screen in dev mode, or the admin panel
// in production
startNetworkLogging();

const App = () => {
  return (
    <SentryProvider>
      <EASUpdateProvider>
        <NetworkProvider>
          <QueryClientProvider client={queryClient}>
            <PreferencesProvider>
              <MetadataProvider>
                <QonversionProvider>
                  <NavigationProvider>
                    <PosthogProvider>
                      <AuthProvider>
                        <UserProvider>
                          <GestureHandlerRootView style={{ flex: 1 }}>
                            <BottomSheetModalProvider>
                              <BottomSheetProvider>
                                <WebsocketProvider>
                                  <GestureDetectorProvider>
                                    <RootNavigator />
                                  </GestureDetectorProvider>
                                </WebsocketProvider>
                              </BottomSheetProvider>
                            </BottomSheetModalProvider>
                            {/* TODO: Move to provider, we have an Overlay provider but its not global */}
                            <StatusOverlay />
                            <Toast config={toastConfig} />
                          </GestureHandlerRootView>
                        </UserProvider>
                      </AuthProvider>
                    </PosthogProvider>
                  </NavigationProvider>
                </QonversionProvider>
              </MetadataProvider>
            </PreferencesProvider>
          </QueryClientProvider>
        </NetworkProvider>
      </EASUpdateProvider>
    </SentryProvider>
  );
};

// Register the root component
// This is the main component that is mounted
registerRootComponent(App);

export default App;

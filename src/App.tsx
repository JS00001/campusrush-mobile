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
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import "react-native-console-time-polyfill";
import { registerRootComponent } from "expo";
import * as ExpoSplashScreen from "expo-splash-screen";
import { QueryClientProvider } from "@tanstack/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { startNetworkLogging } from "react-native-network-logger";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AuthProvider from "@/providers/Auth";
import UserProvider from "@/providers/User";
import queryClient from "@/lib/query-client";
import OverlayProvider from "@/providers/Overlay";
import NetworkProvider from "@/providers/Network";
import MetadataProvider from "@/providers/Metadata";
import WebsocketProvider from "@/providers/Websocket";
import EASUpdateProvider from "@/providers/EASUpdate";
import RootNavigator from "@/navigation/root-navigator";
import NavigationProvider from "@/providers/Navigation";
import SentryProvider from "@/providers/external/Sentry";
import PreferencesProvider from "@/providers/Preferences";
import PosthogProvider from "@/providers/external/Posthog";
import BottomSheetsComponent from "@/components/BottomSheets";
import QonversionProvider from "@/providers/external/Qonversion";
import GestureDetectorProvider from "@/providers/GestureDetector";

// Prevent native splash screen from autohiding
// when app/component is mounted
ExpoSplashScreen.preventAutoHideAsync();

// Start network logging no matter what
// Visible by shaking the screen in dev mode, or the admin panel
// in production
startNetworkLogging();

// Configure reanimated logger to not log strict mode
// messages. Some of these issues are due to gorhom bottom sheet
configureReanimatedLogger({
  level: ReanimatedLogLevel.error,
  strict: false,
});

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
                            <OverlayProvider>
                              <BottomSheetModalProvider>
                                <WebsocketProvider>
                                  <GestureDetectorProvider>
                                    <BottomSheetsComponent />
                                    <RootNavigator />
                                  </GestureDetectorProvider>
                                </WebsocketProvider>
                              </BottomSheetModalProvider>
                            </OverlayProvider>
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

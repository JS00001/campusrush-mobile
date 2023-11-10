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

import lodash from "lodash";
import { DeviceMotion } from "expo-sensors";
import { View, Pressable } from "react-native";
import { MenuView } from "@react-native-menu/menu";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import NetworkLogger from "react-native-network-logger";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import AppConstants from "@/constants";
import { formatJSON } from "@/lib/format";
import { useAuth } from "@/providers/Auth";
import SegmentedControl from "@/ui/SegmentedControl";
import { usePreferences } from "@/providers/Preferences";

const DevEnvironment: React.FC = ({}) => {
  const { updatePreferences } = usePreferences();
  // Use data from auth provider
  const { signOut, organization, billingData } = useAuth();
  // The active index of the segmented control
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // Ref to the bottom sheet modal so we can programmatically open it
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // Create state for all the data from async storage
  const [asyncStorageData, setAsyncStorageData] = useState<any>({});

  // Memoized snap points (When the bottom sheet modal is open)
  const snapPoints = useMemo(() => ["75%"], []);

  // Open the bottom sheet modal
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // Close the bottom sheet modal
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // Fetch all async storage data
  const fetchAsyncStorageData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet(keys);
    const data = lodash.fromPairs(values);

    setAsyncStorageData(data);
  };

  // Listen for shake gesture if we are in development mode
  useEffect(() => {
    // Ensure we are in development mode
    if (__DEV__) {
      // Listen for shake gesture, show dev screen when it happens
      const subscription = listenForShake(() => {
        handlePresentModalPress();
      });

      // Remove the listener when the component unmounts
      return () => subscription.remove();
    }
  }, []);

  useEffect(() => {
    fetchAsyncStorageData();
  }, []);

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        // Make clicking outside the bottom sheet modal dismiss it
        backdropComponent={() => (
          <Pressable
            style={tw`h-full w-full absolute bg-black opacity-20`}
            onPress={handleCloseModalPress}
          />
        )}
      >
        <View style={tw`w-full px-4 py-2`}>
          <SegmentedControl
            values={["Network", "Overrides", "Debug Info", "Storage"]}
            selectedIndex={activeIndex}
            onChange={(event) => {
              setActiveIndex(event.nativeEvent.selectedSegmentIndex);
            }}
          />
        </View>

        {/* Network logger */}
        {activeIndex === 0 && (
          <NetworkLogger
            theme={{
              colors: {
                background: "white",
              },
            }}
          />
        )}

        {/* Overrides */}
        {activeIndex === 1 && (
          <>
            <Layout gap={20} scrollable contentContainerStyle={tw`pb-12`}>
              <View style={tw`w-full gap-y-2`}>
                <Text style={tw`w-full font-medium`} variant="body">
                  Current Subscription?
                </Text>

                <View style={tw`bg-slate-100 p-3 rounded-md w-full`}>
                  {lodash.isEmpty(billingData?.entitlements?.active) ? (
                    <Text style={tw`text-red-700`}>No active subscription</Text>
                  ) : (
                    <Text style={tw`text-green-700`}>Subscription active</Text>
                  )}
                </View>
              </View>

              <View style={tw`w-full gap-y-2`}>
                <Text style={tw`w-full font-medium`} variant="body">
                  Auth Overrides
                </Text>
                <Button
                  iconLeft="ri-logout-circle-line"
                  onPress={() => {
                    signOut();
                    handleCloseModalPress();
                  }}
                >
                  Force Logout
                </Button>
              </View>

              <View style={tw`w-full gap-y-2`}>
                <Text style={tw`w-full font-medium`} variant="body">
                  Preferences Overrides
                </Text>
                <Button
                  iconLeft="ri-settings-3-line"
                  onPress={() => {
                    updatePreferences({
                      ...AppConstants.preferences,
                    });
                    handleCloseModalPress();
                  }}
                >
                  Reset All Preferences
                </Button>
              </View>

              <View style={tw`w-full gap-y-2`}>
                <Text style={tw`w-full font-medium`} variant="body">
                  Subscription Overrides
                </Text>
                <Button
                  disabled={lodash.isEmpty(organization)}
                  iconLeft="ri-delete-bin-line"
                >
                  Clear Subscriptions
                </Button>
                <Button
                  disabled={lodash.isEmpty(organization)}
                  iconLeft="ri-vip-diamond-line"
                >
                  Force Basic Subscription
                </Button>
                <Button
                  disabled={lodash.isEmpty(organization)}
                  iconLeft="ri-copper-diamond-line"
                >
                  Force Pro Subscription
                </Button>
              </View>
            </Layout>
          </>
        )}

        {/* Debug Information */}
        {activeIndex === 2 && (
          <>
            <Layout gap={20} scrollable contentContainerStyle={tw`items-start`}>
              <View style={tw`w-full gap-y-2`}>
                <Text style={tw`font-medium`} variant="body">
                  App Version
                </Text>
                <View style={tw`bg-slate-100 p-2 rounded-md w-full`}>
                  <Text>{AppConstants.version}</Text>
                </View>
              </View>

              <View style={tw`w-full gap-y-2`}>
                <Text style={tw`font-medium`} variant="body">
                  Current Organization
                </Text>
                <View style={tw`bg-slate-100 p-2 rounded-md w-full`}>
                  <Text>
                    {JSON.stringify(organization, null, 2).slice(1, -1)}
                  </Text>
                </View>
              </View>

              <View style={tw`w-full gap-y-2`}>
                <Text style={tw`w-full font-medium`} variant="body">
                  Current Subscription
                </Text>

                <View style={tw`bg-slate-100 p-2 rounded-md w-full`}>
                  {lodash.isEmpty(billingData?.entitlements?.active) ? (
                    <Text>No active subscription</Text>
                  ) : (
                    <Text>
                      {JSON.stringify(
                        billingData?.entitlements?.active,
                        null,
                        2,
                      ).slice(1, -1)}
                    </Text>
                  )}
                </View>
              </View>

              <View style={tw`w-full gap-y-2`}>
                <Text style={tw`font-medium`} variant="body">
                  RevenueCat Entitlement Information
                </Text>
                <View style={tw`bg-slate-100 p-2 rounded-md w-full`}>
                  <Text>
                    {JSON.stringify(billingData?.entitlements, null, 2).slice(
                      1,
                      -1,
                    )}
                  </Text>
                </View>
              </View>
            </Layout>
          </>
        )}

        {/* Storage information */}
        {activeIndex === 3 && (
          <>
            <Layout
              gap={20}
              scrollable
              contentContainerStyle={tw`items-start pb-12`}
            >
              <View style={tw`w-full gap-y-2`}>
                <Button
                  onPress={() => {
                    fetchAsyncStorageData();
                  }}
                >
                  Refresh Data
                </Button>
                <Text style={tw`font-medium`} variant="body">
                  Async Storage items
                </Text>
                {Object.keys(asyncStorageData).map((key) => (
                  <MenuView
                    key={key}
                    actions={[
                      {
                        title: "Delete From Storage",
                        id: "delete",
                        image: "trash",
                        attributes: {
                          destructive: true,
                        },
                      },
                    ]}
                    onPressAction={() => {
                      AsyncStorage.removeItem(key);
                      fetchAsyncStorageData();
                    }}
                    shouldOpenOnLongPress
                  >
                    <View style={tw`bg-slate-100 p-2 rounded-md w-full`}>
                      <Text>
                        {key}: {formatJSON(asyncStorageData[key])}
                      </Text>
                    </View>
                  </MenuView>
                ))}
              </View>
            </Layout>
          </>
        )}
      </BottomSheetModal>
    </>
  );
};

const listenForShake = (shakeAction: () => void) => {
  let shaking = false; // Whether or not the device is currently shaking
  let shakeStartTime = 0; // When the shake started
  const shakeThreshold = 2; //  How hard the shake has to be to register (lower = harder)
  const shakeDuration = 1000; // How long until we consider a shake complete (in milliseconds)

  const subscription = DeviceMotion.addListener(({ acceleration }) => {
    if (!acceleration) return;

    // total acceleration = sqrt(x^2 + y^2 + z^2)
    // https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/acceleration
    const totalAcceleration = Math.sqrt(
      acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2,
    );

    // If we aren't already shaking, check if we should start
    if (!shaking && totalAcceleration > shakeThreshold) {
      shaking = true;
      shakeStartTime = Date.now();
    } else if (shaking && totalAcceleration <= shakeThreshold) {
      shaking = false;
    }

    // If we've been shaking for long enough (shakeDuration), perform the action
    if (shaking && Date.now() - shakeStartTime >= shakeDuration) {
      shakeAction();
      shaking = false;
    }
  });

  return subscription;
};

export default DevEnvironment;

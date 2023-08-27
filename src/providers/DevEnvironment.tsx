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

import { DeviceMotion } from "expo-sensors";
import { View, Pressable } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import NetworkLogger from "react-native-network-logger";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import { useAuth } from "@/providers/Auth";
import SegmentedControl from "@/ui/SegmentedControl";

interface DevEnvironmentProviderProps {
  children: React.ReactNode;
}

const DevEnvironmentProvider: React.FC<DevEnvironmentProviderProps> = ({
  children,
}) => {
  // Use data from auth provider
  const { signOut } = useAuth();
  // The active index of the segmented control
  const [activeIndex, setActiveIndex] = useState<number>(0);
  // Ref to the bottom sheet modal so we can programmatically open it
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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

  return (
    <>
      {children}
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
            values={["Network", "Overrides"]}
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
            <Layout gap={8} scrollable>
              <Text style={tw`w-full text-gray-500 font-medium`} variant="body">
                Auth Overrides
              </Text>
              <Button
                onPress={() => {
                  signOut();
                  handleCloseModalPress();
                }}
              >
                Force Logout
              </Button>

              <Text
                style={tw`w-full text-gray-500 font-medium mt-6`}
                variant="body"
              >
                Subscription Overrides
              </Text>
              <Button disabled>Clear Subscriptions</Button>
              <Button disabled>Force Basic Subscription</Button>
              <Button disabled>Force Pro Subscription</Button>
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

export default DevEnvironmentProvider;

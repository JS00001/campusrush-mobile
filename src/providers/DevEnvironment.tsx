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
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import NetworkLogger from "react-native-network-logger";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface DevEnvironmentProviderProps {
  children: React.ReactNode;
}

const DevEnvironmentProvider: React.FC<DevEnvironmentProviderProps> = ({
  children,
}) => {
  // Ref to the bottom sheet modal so we can programmatically open it
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Memoized snap points (When the bottom sheet modal is open)
  const snapPoints = useMemo(() => ["75%"], []);

  // Open the bottom sheet modal
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
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
      >
        <NetworkLogger
          theme={{
            colors: {
              background: "white",
            },
          }}
        />
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

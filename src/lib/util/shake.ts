/*
 * Created on Mon Mar 18 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { DeviceMotion } from 'expo-sensors';

/**
 * Listen for a shake event and perform an action when it occurs
 */
export const listenForShake = (shakeAction: () => void) => {
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

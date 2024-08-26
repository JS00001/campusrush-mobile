/*
 * Created on Mon Aug 26 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { useAuth } from "@/providers/Auth";
import { useBottomSheet } from "@/providers/BottomSheet";

const GestureDetectorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { chapter } = useAuth();
  const { openBottomSheet } = useBottomSheet();

  const onTripleFingerTap = (event: any) => {
    if (event.numberOfTouches === 3) {
      if (__DEV__ || chapter.role === "admin") {
        openBottomSheet("DEVELOPER_TOOLS");
      }
    }
  };

  const threeFingerGesture = Gesture.Tap()
    .numberOfTaps(1)
    .maxDistance(20)
    .onTouchesDown(onTripleFingerTap);

  return (
    <GestureDetector gesture={threeFingerGesture}>
      <View style={{ flex: 1 }}>{children}</View>
    </GestureDetector>
  );
};

export default GestureDetectorProvider;

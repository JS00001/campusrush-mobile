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

import { useUser } from "@/providers/User";
import { useBottomSheetStore } from "@/store";

const GestureDetectorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const bottomSheetStore = useBottomSheetStore();

  const onTripleFingerTap = (event: any) => {
    if (event.numberOfTouches === 3) {
      if (__DEV__ || user.systemRole === "admin") {
        bottomSheetStore.open("DEVELOPER_TOOLS");
      }
    }
  };

  const threeFingerGesture = Gesture.Tap()
    .numberOfTaps(1)
    .maxDistance(20)
    .onTouchesDown(onTripleFingerTap)
    .runOnJS(true);

  return (
    <GestureDetector gesture={threeFingerGesture}>
      <View style={{ flex: 1 }}>{children}</View>
    </GestureDetector>
  );
};

export default GestureDetectorProvider;

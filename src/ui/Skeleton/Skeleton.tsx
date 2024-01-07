/*
 * Created on Tue Aug 29 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

import tw from "@/lib/tailwind";

interface SkeletonProps {
  style?: any;
  borderRadius?: number;
  width?: number | `${number}%` | `w-${number}`;
  height?: number | `${number}%` | `h-${number}`;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 4,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 750,
      useNativeDriver: true,
    };
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(animatedValue, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ]),
    ).start();

    return () => {
      animatedValue.stopAnimation();
    };
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.4],
  });

  // use the height passed if it is a percent or number, if it is h-<number> then use the number * 4
  if (typeof height === "string" && height.includes("h-")) {
    height = parseInt(height.replace("h-", "")) * 4;
  }

  // use the width passed if it is a percent or number, if it is w-<number> then use the number * 4
  if (typeof width === "string" && width.includes("w-")) {
    width = parseInt(width.replace("w-", "")) * 4;
  }

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          opacity,
          borderRadius,
          backgroundColor: tw.color("slate-300"),
        },
        style,
      ]}
    />
  );
};

export default Skeleton;

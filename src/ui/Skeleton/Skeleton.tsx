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

import { Animated, Easing } from "react-native";
import { useRef, useEffect } from "react";

import tw from "@/lib/tailwind";

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  style?: any;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 20,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 500,
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
    outputRange: [1, 0.5],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          opacity,
          borderRadius: 8,
          backgroundColor: tw.color("slate-300"),
        },
        style,
      ]}
    />
  );
};

export default Skeleton;

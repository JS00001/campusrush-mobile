/*
 * Created on Fri Mar 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useEffect, useState } from "react";
import { Animated, Easing, View, ViewProps } from "react-native";

import tw from "@/lib/tailwind";

interface ProgressProps extends ViewProps {
  loading: boolean;
  style?: any;
}

const Progress: React.FC<ProgressProps> = ({ loading, style, ...props }) => {
  const [position] = useState(new Animated.Value(0));

  // Begin or stop the animation based on the loading prop
  useEffect(() => {
    if (!loading) {
      position.setValue(0);
      position.stopAnimation();
      return;
    }

    Animated.loop(
      Animated.timing(position, {
        toValue: 1,
        duration: 750,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
    ).start();

    return () => {
      position.stopAnimation();
    };
  }, [loading]);

  const containerStyles = tw.style(
    "w-full h-0.5",
    loading && "opacity-100",
    !loading && "opacity-0",
    style,
  );

  const progressStyles = tw.style(
    "h-full w-24 bg-blue-800 overflow-hidden absolute",
    {
      left: position.interpolate({
        inputRange: [0, 1],
        outputRange: ["-80%", "100%"],
      }),
    },
  );

  return (
    <View style={containerStyles} {...props}>
      <Animated.View style={progressStyles} />
    </View>
  );
};

export default Progress;

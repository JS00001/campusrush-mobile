/*
 * Created on Thu Oct 12 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useEffect, useState } from "react";
import { View, Animated, Easing } from "react-native";

import tw from "@/lib/tailwind";

interface ProgressBarProps {
  loading?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ loading }) => {
  // Create a state variable 'position' using the 'useState' hook
  const [position, _] = useState(new Animated.Value(0));

  useEffect(() => {
    // If 'loading' becomes false, reset and stop the animation
    if (!loading) {
      position.setValue(0);
      position.stopAnimation();
      return;
    }

    // Create an animation loop if 'loading' is true
    Animated.loop(
      Animated.timing(position, {
        toValue: 1,
        duration: 750,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
    ).start();

    // Clean up the animation when the component unmounts
    return () => {
      position.stopAnimation();
    };
  }, [loading]);

  // Define styles for the container and progress bar
  const containerStyle = tw.style(
    "w-full h-0.5",
    loading ? "opacity-100" : "opacity-0",
  );

  const progressStyle = tw.style(
    "h-full w-36 bg-blue-800 overflow-hidden absolute",
    {
      left: position.interpolate({
        inputRange: [0, 1],
        outputRange: ["-80%", "100%"],
      }),
    },
  );

  return (
    <View style={containerStyle}>
      <Animated.View style={progressStyle} />
    </View>
  );
};

export default ProgressBar;

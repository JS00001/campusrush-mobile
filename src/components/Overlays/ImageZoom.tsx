/*
 * Created on Sat Aug 31 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Zoomable } from "@likashefqet/react-native-image-zoom";

import tw from "@/lib/tailwind";
import IconButton from "@/ui/IconButton";
import { useImageZoomStore } from "@/store";

const ImageZoomOverlay = () => {
  const { image, clear } = useImageZoomStore();

  const opacity = useSharedValue(0.5);
  const scale = useSharedValue(0.1);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (image) {
      setHidden(false);
      opacity.value = withTiming(1, { duration: 150 });
      scale.value = withTiming(1, { duration: 150 });
    } else {
      opacity.value = withTiming(0, { duration: 150 }, () => {
        runOnJS(setHidden)(true);
      });
      scale.value = withTiming(0.85, { duration: 150 });
    }
  }, [image]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const containerClasses = tw.style(
    "inset-0 z-50 absolute",
    "bg-black items-center justify-center py-10",
    hidden && "hidden",
  );

  const zoomableContainerClasses = tw.style(
    "w-full items-center justify-center",
  );

  const iconButtonStyles = tw.style("absolute z-50 top-18 right-4");

  return (
    <Animated.View style={[containerClasses, animatedContainerStyle]}>
      <IconButton
        size="sm"
        label="Close"
        color="secondary"
        iconName="close-fill"
        style={iconButtonStyles}
        onPress={clear}
      />

      <Zoomable
        minScale={0.75}
        isSingleTapEnabled
        isDoubleTapEnabled
        style={zoomableContainerClasses}
      >
        <Image
          contentFit="contain"
          style={{ width: "100%", flex: 1 }}
          source={{ uri: image }}
        />
      </Zoomable>
    </Animated.View>
  );
};

export default ImageZoomOverlay;

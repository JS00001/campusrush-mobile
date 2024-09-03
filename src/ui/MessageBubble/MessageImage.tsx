/*
 * Created on Tue Sep 03 2024
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
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { Image } from "expo-image";
import { Pressable } from "react-native";

import type { ActionMenu } from "@/types";

import tw from "@/lib/tailwind";
import useCamera from "@/hooks/useCamera";
import { useImageZoomStore } from "@/store";
import { useBottomSheet } from "@/providers/BottomSheet";

interface MessageImageProps {
  url: string;
}

const MessageImage: React.FC<MessageImageProps> = ({ url }) => {
  const camera = useCamera();
  const scale = useSharedValue(1);
  const { setImage } = useImageZoomStore();
  const { openBottomSheet } = useBottomSheet();

  const imageContainerShadow = tw.style({
    borderRadius: 12,
    backgroundColor: "#fff",
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  });

  const imageStyles = tw.style("w-full max-h-64 rounded-xl", {
    aspectRatio: 1,
  });

  const imageAnimationStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const imageMenu: ActionMenu = [
    {
      header: "Quick Actions",
      menuItems: [
        {
          iconName: "download-line",
          label: "Save Image",
          onPress: () => {
            camera.saveImage(url);
          },
        },
      ],
    },
  ];

  /**
   * On click, open the overlay to show the image
   * and zoom in on the image
   */
  const onPress = () => {
    setImage(url);
  };

  /**
   * On long press, play a small animation and open the
   * action menu
   */
  const onLongPress = () => {
    const TRANSFORM_VALUE = 0.97;
    scale.value = withSpring(
      TRANSFORM_VALUE,
      { damping: 20, stiffness: 300 },
      () => {
        scale.value = withTiming(1, { duration: 300 });
      },
    );
    openBottomSheet("ACTION_MENU", imageMenu);
  };

  return (
    <Animated.View style={[imageContainerShadow, imageAnimationStyles]}>
      <Pressable onPress={onPress} onLongPress={onLongPress}>
        <Image source={{ uri: url }} style={imageStyles} />
      </Pressable>
    </Animated.View>
  );
};

export default MessageImage;

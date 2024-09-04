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
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "react-native";

import type { ActionMenu } from "@/types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import useCopy from "@/hooks/useCopy";
import { TimestampedMessage } from "@/lib/messages";
import { useBottomSheet } from "@/providers/BottomSheet";

interface MessageContentProps {
  message: TimestampedMessage;
}

const MessageContent: React.FC<MessageContentProps> = ({ message }) => {
  const copy = useCopy();
  const scale = useSharedValue(1);
  const { openBottomSheet } = useBottomSheet();

  const contentContainerStyles = tw.style(
    "rounded-xl p-2.5 max-w-5/6 self-start self-end",
    message.sent && "bg-blue-600",
    !message.sent && "bg-gray-100",
  );

  const contentTextStyles = tw.style(
    "text-base",
    message.sent && "text-white",
    !message.sent && "text-black",
  );

  const contentAnimationStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const messageMenu: ActionMenu = [
    {
      header: "Quick Actions",
      menuItems: [
        {
          iconName: "file-copy-line",
          label: "Copy Message",
          onPress: () => copy(message.content!, "Message"),
        },
      ],
    },
  ];

  const onLongPress = () => {
    const TRANSFORM_VALUE = 0.9;
    scale.value = withSpring(
      TRANSFORM_VALUE,
      { damping: 20, stiffness: 300 },
      () => {
        scale.value = withTiming(1, { duration: 300 });
      },
    );
    openBottomSheet("ACTION_MENU", messageMenu);
  };

  return (
    <Animated.View style={[contentContainerStyles, contentAnimationStyles]}>
      <Pressable onLongPress={onLongPress}>
        <Text style={contentTextStyles}>{message.content}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default MessageContent;

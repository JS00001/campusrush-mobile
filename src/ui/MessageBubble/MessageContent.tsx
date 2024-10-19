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
import { Pressable, View } from "react-native";

import type { ActionMenu, IMessage } from "@/types";
import type { TimestampedData } from "@/lib/util/group";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import useCopy from "@/hooks/useCopy";
import { useBottomSheet } from "@/providers/BottomSheet";


interface MessageContentProps {
  message: TimestampedData<IMessage>;
  error?: boolean;
}

const MessageContent: React.FC<MessageContentProps> = ({ message, error }) => {
  const copy = useCopy();
  const scale = useSharedValue(1);
  const { openBottomSheet } = useBottomSheet();

  const containerStyles = tw.style("flex-row items-center self-end gap-1");

  const bubbleContainerStyles = tw.style(
    "rounded-xl p-2.5 max-w-5/6 self-start self-end",
    message.sent && "bg-primary",
    !message.sent && "bg-gray-100",
  );

  const bubbleTextStyles = tw.style(
    "text-base",
    message.sent && "text-white",
    !message.sent && "text-black",
  );

  const bubbleAnimationStyles = useAnimatedStyle(() => {
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
    <View style={containerStyles}>
      {error && (
        <Icon name="error-warning-line" color={tw.color("red")} size={18} />
      )}
      <Animated.View style={[bubbleContainerStyles, bubbleAnimationStyles]}>
        <Pressable onLongPress={onLongPress}>
          <Text style={bubbleTextStyles}>{message.content}</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default MessageContent;

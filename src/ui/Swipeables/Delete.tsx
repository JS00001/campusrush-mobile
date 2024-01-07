/*
 * Created on Sun Jan 07 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import RemixIcon from "react-native-remix-icon";
import { Swipeable } from "react-native-gesture-handler";
import { Animated, TouchableOpacity } from "react-native";
import { SwipeableProps } from "react-native-gesture-handler/lib/typescript/components/Swipeable";

import tw from "@/lib/tailwind";

interface DeleteSwipableProps extends SwipeableProps {
  innerRef?: React.Ref<Swipeable>;
  children: React.ReactNode;
  onDelete: () => void;
}

const DeleteSwipable: React.FC<DeleteSwipableProps> = ({
  innerRef,
  children,
  onDelete,
  ...props
}) => {
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const opacity = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return <Action opacity={opacity} onPress={onDelete} />;
  };

  return (
    <Swipeable
      ref={innerRef}
      renderRightActions={renderRightActions}
      {...props}
    >
      {children}
    </Swipeable>
  );
};

interface ActionProps {
  opacity: Animated.AnimatedInterpolation<number>;
  onPress?: () => void;
}

const Action: React.FC<ActionProps> = ({ opacity, onPress }) => {
  const containerStyles = tw.style(
    "items-center justify-center h-full w-24",
    "bg-red-600 rounded-lg",
  );

  return (
    <Animated.View style={[{ opacity, paddingLeft: 4 }]}>
      <TouchableOpacity onPress={onPress} style={containerStyles}>
        <RemixIcon
          name="ri-delete-bin-6-line"
          size={24}
          color={tw.color("white")}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default DeleteSwipable;

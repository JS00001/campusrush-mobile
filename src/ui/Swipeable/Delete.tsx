/*
 * Created on Sat Mar 16 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { forwardRef } from "react";
import { TouchableOpacity } from "react-native";
import { Swipeable, SwipeableProps } from "react-native-gesture-handler";

import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";

interface DeleteSwipeableProps extends SwipeableProps {
  children: React.ReactNode;
  onDelete: () => void;
}

const DeleteSwipeable = forwardRef<Swipeable, DeleteSwipeableProps>(
  ({ children, onDelete, ...props }: DeleteSwipeableProps, ref) => {
    return (
      <Swipeable
        ref={ref}
        renderRightActions={() => <Action onPress={onDelete} />}
        {...props}
      >
        {children}
      </Swipeable>
    );
  },
);

interface ActionProps {
  onPress: () => void;
}

const Action: React.FC<ActionProps> = ({ onPress }) => {
  const containerStyles = tw.style(
    "items-center justify-center h-full w-24",
    "bg-red-500 rounded-xl ml-2",
  );

  return (
    <TouchableOpacity onPress={onPress} style={containerStyles}>
      <Icon size={24} name="delete-bin-6-line" color={tw.color("white")} />
    </TouchableOpacity>
  );
};

export default DeleteSwipeable;

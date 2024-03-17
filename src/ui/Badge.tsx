/*
 * Created on Wed Mar 06 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, View, ViewProps } from "react-native";

import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import Text, { TextType } from "@/ui/Text";

export type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends ViewProps {
  size?: BadgeSize;
  removable?: boolean;
  onRemove?: () => void;
  style?: any;
}

/**
 * The size of the badge
 */
const BadgeSizes = {
  sm: "py-0.5 px-3",
  md: "py-1 px-4",
  lg: "py-1.5 px-5",
};

/**
 * The size of the text in the badge
 */
const BadgeTextTypes = {
  sm: "p4",
  md: "p3",
  lg: "p2",
};

const Badge: React.FC<BadgeProps> = ({
  size = "md",
  removable = false,
  onRemove,
  style,
  ...props
}) => {
  const sizeStyle = BadgeSizes[size];
  const textType = BadgeTextTypes[size] as TextType;

  const containerStyles = tw.style(
    "bg-primary rounded-full justify-center items-center flex-row self-start",
    // Add space between the badge and the text for the close button
    removable && tw.style("pr-8"),
    sizeStyle,
    style,
  );

  return (
    <View style={containerStyles} {...props}>
      <Text type={textType} style={tw`text-white`}>
        {props.children}
      </Text>

      {removable && <CloseButton onPress={onRemove} />}
    </View>
  );
};

interface CloseButtonProps {
  onPress?: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onPress }) => {
  const containerStyles = tw.style("py-3 pr-3 pl-6 absolute -right-1");

  return (
    <TouchableOpacity onPress={onPress} style={containerStyles}>
      <View style={tw`bg-slate-100 rounded-full`}>
        <Icon size={14} name="close-line" color={tw.color("primary")} />
      </View>
    </TouchableOpacity>
  );
};

export default Badge;

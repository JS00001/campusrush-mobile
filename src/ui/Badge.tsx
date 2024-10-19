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

import { View, ViewProps } from "react-native";

import tw from "@/lib/tailwind";
import Text, { TextType } from "@/ui/Text";

export type BadgeColor = "primary" | "secondary";

export type BadgeSize = "xs" | "sm" | "md" | "lg";

interface BadgeProps extends ViewProps {
  color?: BadgeColor;
  size?: BadgeSize;
  style?: any;
}

/**
 * The color of the badge
 */
const BadgeColors = {
  primary: {
    text: "text-white",
    container: "bg-primary",
  },
  secondary: {
    text: "text-primary",
    container: "bg-gray-100",
  },
};

/**
 * The size of the badge
 */
const BadgeSizes = {
  xs: {
    text: "p5",
    container: "py-0.5 px-2",
  },
  sm: {
    text: "p4",
    container: "py-0.5 px-3",
  },
  md: {
    text: "p3",
    container: "py-1 px-4",
  },
  lg: {
    text: "p2",
    container: "py-1.5 px-5",
  },
};

const Badge: React.FC<BadgeProps> = ({
  size = "md",
  color = "primary",
  style,
  children,
  ...props
}) => {
  const textColor = BadgeColors[color].text;
  const containerColorStyle = BadgeColors[color].container;

  const textType = BadgeSizes[size].text as TextType;
  const containerSizeStyle = BadgeSizes[size].container;

  const containerStyles = tw.style(
    "rounded-full items-center flex-row self-start",
    containerColorStyle,
    containerSizeStyle,
    style,
  );

  const textStyles = tw.style(textColor);

  return (
    <View style={containerStyles} {...props}>
      <Text type={textType} style={textStyles}>
        {children}
      </Text>
    </View>
  );
};

export default Badge;

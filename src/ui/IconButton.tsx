/*
 * Created on Mon Mar 04 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import type { IconType } from "@/constants/icons";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

export type IconButtonColor = "primary" | "secondary" | "tertiary";

export type IconButtonSize = "xs" | "sm" | "md" | "lg";

interface IconButtonProps extends TouchableOpacityProps {
  iconName: IconType;
  iconColor?: string;
  label?: string;
  style?: any;
  loading?: boolean;
  color?: IconButtonColor;
  size?: IconButtonSize;
}

/**
 * The sizes for all of the IconButton components
 */
const IconButtonSizes = {
  sm: {
    icon: 20,
    text: "p4",
    container: { padding: 8 },
  },
  md: {
    icon: 22,
    text: "p4",
    container: { padding: 10 },
  },
  lg: {
    icon: 24,
    text: "p3",
    container: { padding: 12 },
  },
};

/**
 * The color for all of the IconButton components
 */
const IconButtonColors = {
  primary: {
    container: "bg-navy-50",
    color: tw.color("white"),
  },
  secondary: {
    container: "bg-gray-100",
    color: tw.color("primary"),
  },
  tertiary: {
    container: "bg-gray-200",
    color: tw.color("primary"),
  },
};

const IconButton: React.FC<IconButtonProps> = ({
  style,
  loading,
  iconName,
  iconColor,
  label,
  size = "lg",
  color = "primary",
  disabled,
  ...props
}) => {
  const phLabel = props["ph-label"] || `icon-button-"${iconName}"`;
  disabled = disabled || loading;

  const textColor = IconButtonColors[color].color;

  const containerStyles = tw.style(
    "rounded-full self-start flex-row items-center gap-x-2 shrink-0",
    disabled && "disabled",
    IconButtonColors[color].container,
    IconButtonSizes[size].container,
    style,
  );

  const loadingIndicatorStyles = tw.style(
    "absolute inset-0",
    "items-center justify-center z-10",
  );

  return (
    <TouchableOpacity
      {...props}
      ph-label={phLabel}
      disabled={disabled}
      style={containerStyles}
    >
      {loading && (
        <View style={loadingIndicatorStyles}>
          <ActivityIndicator size="small" />
        </View>
      )}

      <Icon
        icon={iconName}
        color={iconColor || textColor}
        size={IconButtonSizes[size].icon}
        style={tw.style(loading && "opacity-0")}
      />

      {label && (
        <Text style={tw.style({ color: textColor }, "font-medium")}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default IconButton;

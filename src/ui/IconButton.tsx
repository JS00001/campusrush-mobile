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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Icon, { IconType } from "@/ui/Icon";

export type IconButtonColor = "primary" | "secondary" | "tertiary";

export type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends TouchableOpacityProps {
  iconName: IconType;
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
    icon: 22,
    text: "p4",
    container: { padding: 10 },
  },
  md: {
    icon: 24,
    text: "p3",
    container: { padding: 12 },
  },
  lg: {
    icon: 26,
    text: "p2",
    container: { padding: 14 },
  },
};

/**
 * The color for all of the IconButton components
 */
const IconButtonColors = {
  primary: {
    container: "bg-primary",
    color: tw.color("white"),
  },
  secondary: {
    container: "bg-slate-100",
    color: tw.color("primary"),
  },
  tertiary: {
    container: "bg-slate-200",
    color: tw.color("primary"),
  },
};

const IconButton: React.FC<IconButtonProps> = ({
  style,
  loading,
  iconName,
  label,
  size = "lg",
  color = "primary",
  disabled,
  ...props
}) => {
  disabled = disabled || loading;

  const textColor = IconButtonColors[color].color;

  const containerStyles = tw.style(
    "rounded-full self-start flex-row items-center gap-x-2",
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
    <TouchableOpacity {...props} disabled={disabled} style={containerStyles}>
      {loading && (
        <View style={loadingIndicatorStyles}>
          <ActivityIndicator size="small" />
        </View>
      )}

      <Icon
        name={iconName}
        color={textColor}
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

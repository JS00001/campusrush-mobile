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

import tw from "@/lib/tailwind";
import Icon, { IconType } from "@/ui/Icon";

export type IconButtonColor = "primary" | "secondary";

export type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends TouchableOpacityProps {
  iconName: IconType;
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
    container: { padding: 8 },
    icon: 20,
  },
  md: {
    container: { padding: 10 },
    icon: 22,
  },
  lg: {
    container: { padding: 12 },
    icon: 24,
  },
};

/**
 * The color for all of the IconButton components
 */
const IconButtonColors = {
  primary: {
    container: "bg-navy-300",
    icon: tw.color("white"),
  },
  secondary: {
    container: "bg-slate-100",
    icon: tw.color("bg-navy-300"),
  },
};

const IconButton: React.FC<IconButtonProps> = ({
  style,
  loading,
  iconName,
  size = "lg",
  color = "primary",
  disabled,
  ...props
}) => {
  disabled = disabled || loading;

  const containerStyles = tw.style(
    "rounded-full self-start",
    IconButtonColors[color].container,
    IconButtonSizes[size].container,
    style,
  );

  const loadingIndicatorStyles = tw.style(
    "absolute w-full h-full",
    "items-center justify-center z-10",
  );

  return (
    <View>
      {loading && (
        <View style={loadingIndicatorStyles}>
          <ActivityIndicator size="small" />
        </View>
      )}

      <TouchableOpacity {...props} disabled={disabled} style={containerStyles}>
        <Icon
          name={iconName}
          size={IconButtonSizes[size].icon}
          color={IconButtonColors[color].icon}
          style={tw.style(loading && "opacity-0")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;

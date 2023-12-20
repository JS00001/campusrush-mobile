/*
 * Created on Sat Sep 02 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import RemixIcon from "react-native-remix-icon";

import tw from "@/lib/tailwind";

interface IconButtonProps extends TouchableOpacityProps {
  icon: string;
  color?: string;
  style?: any;
  loading?: boolean;
  disabled?: boolean;
  size?: keyof typeof sizeClasses;
  onPress?: () => void;
}

/**
 * Size classes provide the proper sizes for both the container and text
 * components of the button.
 */
const sizeClasses = {
  sm: {
    container: tw.style("p-2"),
    icon: 20,
  },
  md: {
    container: tw.style("p-2.5"),
    icon: 22,
  },
  lg: {
    container: tw.style("p-3.5"),
    icon: 24,
  },
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  disabled,
  loading,
  color,
  size = "lg",
  onPress,
  style,
  ...props
}) => {
  disabled = disabled || loading;

  const iconColor = disabled
    ? tw.color("slate-300")
    : color
    ? color
    : tw.color("primary");

  // Styling
  const containerClasses = tw.style(
    // Base styles
    "rounded-full bg-slate-100",
    // Size styles
    sizeClasses[size].container,
    // Custom styles
    style,
  );

  const loadingIndicatorClasses = tw.style(
    "absolute w-full h-full items-center justify-center z-10",
  );

  return (
    <View>
      {/* Loading indicator */}
      {loading && (
        <View style={loadingIndicatorClasses}>
          <ActivityIndicator size={"small"} />
        </View>
      )}

      <TouchableOpacity
        {...props}
        onPress={onPress}
        disabled={disabled}
        style={containerClasses}
      >
        <RemixIcon
          name={icon}
          size={sizeClasses[size].icon}
          color={iconColor}
          style={tw.style(loading && `opacity-0`)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;

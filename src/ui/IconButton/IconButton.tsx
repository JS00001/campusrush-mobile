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

import RemixIcon from "react-native-remix-icon";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import tw from "@/lib/tailwind";

interface IconButtonProps extends TouchableOpacityProps {
  icon: string;
  size?: keyof typeof sizeClasses;
  disabled?: boolean;
  onPress?: () => void;
  style?: any;
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
  lg: {
    container: tw.style("p-3.5"),
    icon: 24,
  },
};

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  disabled,
  size = "lg",
  onPress,
  style,
  ...props
}) => {
  // Styling
  const containerClasses = tw.style(
    // Base styles
    "rounded-full bg-slate-100 self-start",
    // Size styles
    sizeClasses[size].container,
    // Disabled styles
    disabled && "opacity-50",
    // Custom styles
    style,
  );

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      disabled={disabled}
      style={containerClasses}
    >
      <RemixIcon
        name={icon}
        size={sizeClasses[size].icon}
        color={tw.color("slate-600")}
      />
    </TouchableOpacity>
  );
};

export default IconButton;

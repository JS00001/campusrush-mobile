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
  disabled?: boolean;
  onPress?: () => void;
  style?: any;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  disabled,
  onPress,
  style,
  ...props
}) => {
  // Styling
  const containerClasses = tw.style(
    // Base styles
    "p-4 rounded-full bg-slate-100",
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
      <RemixIcon name={icon} size={24} color={tw.color("slate-600")} />
    </TouchableOpacity>
  );
};

export default IconButton;

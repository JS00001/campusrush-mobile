/*
 * Created on Fri Mar 08 2024
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
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import type { IconType } from "@/constants/icons";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

export type ButtonColor = "primary" | "secondary" | "tertiary";

interface ButtonProps extends TouchableOpacityProps {
  color?: ButtonColor;
  iconLeft?: IconType;
  iconRight?: IconType;
  style?: any;
  textStyle?: any;
  loading?: boolean;
  children: React.ReactNode;
}

/**
 * The colors of the button
 */
const ButtonColors = {
  primary: {
    container: "bg-primary",
    text: "text-white",
    icon: tw.color("white"),
  },
  secondary: {
    container: "bg-gray-100",
    text: "text-primary",
    icon: tw.color("primary"),
  },
  tertiary: {
    container: "bg-gray-200",
    text: "text-primary",
    icon: tw.color("primary"),
  },
};

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  iconLeft,
  iconRight,
  style,
  textStyle,
  loading = false,
  disabled = false,
  children,
  ...props
}) => {
  const childString = children?.toString().split(":")[0];
  const label = props["ph-label"] || `button-"${childString}"`;

  // Set the button to disabled if it's loading or if it's explicitly disabled
  disabled = loading || disabled;

  const colorStyle = ButtonColors[color];

  const containerStyles = tw.style(
    "flex-row items-center justify-center gap-2.5 w-full",
    "px-2 py-3 rounded-xl ",
    disabled && "disabled",
    colorStyle.container,
    style,
  );

  const textStyles = tw.style(
    "text-center font-medium text-base",
    loading && "opacity-0",
    colorStyle.text,
    textStyle,
  );

  return (
    <TouchableOpacity
      ph-label={label}
      style={containerStyles}
      disabled={disabled}
      {...props}
    >
      {iconLeft && (
        <Icon
          size={16}
          icon={iconLeft}
          color={colorStyle.icon}
          style={textStyles}
        />
      )}

      <Text style={textStyles}>{children}</Text>

      {loading && (
        <ActivityIndicator
          size="small"
          color={colorStyle.icon}
          style={tw`absolute inset-0`}
        />
      )}

      {iconRight && (
        <Icon
          size={16}
          icon={iconRight}
          color={colorStyle.icon}
          style={textStyles}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

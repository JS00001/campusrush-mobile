/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Icon from "react-native-remix-icon";
import {
  ActivityIndicator,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface ButtonProps extends TouchableOpacityProps {
  size?: keyof typeof sizeClasses;
  color?: keyof typeof colorClasses;
  style?: any;
  loading?: boolean;
  disabled?: boolean;
  iconLeft?: string; // TODO: Add proper icon name support
  iconRight?: string; // TODO: Add proper icon name support
  children: React.ReactNode;
}

/**
 * Size classes provide the proper sizes for both the container and text
 * components of the button.
 */
const sizeClasses = {
  sm: {
    container: tw.style("px-8 py-3.5"),
    text: tw.style("text-base font-normal"),
    icon: 16,
  },
  lg: {
    container: tw.style("w-full p-4"),
    text: tw.style("text-lg font-medium"),
    icon: 20,
  },
};

/**
 * Color classes provide the proper colors for the container, text, and icon
 * components of the button.
 *
 * Each color class is an object with properties for each component.
 * Each component property will have different state styles
 * (e.g. hover, active, disabled, etc.)
 */
const colorClasses = {
  dark: {
    container: {
      default: tw.style("bg-primary"),
      disabled: tw.style("bg-slate-300"),
    },
    text: {
      default: tw.style("text-white"),
      disabled: tw.style("text-slate-200"),
    },
    icon: {
      default: "text-white",
      disabled: "text-slate-200",
    },
  },
  light: {
    container: {
      default: tw.style("bg-white"),
      disabled: tw.style("bg-slate-300"),
    },
    text: {
      default: tw.style("text-primary"),
      disabled: tw.style("text-slate-200"),
    },
    icon: {
      default: "text-primary",
      disabled: "text-slate-200",
    },
  },
};

const Button: React.FC<ButtonProps> = ({
  size = "lg",
  color = "dark",
  style,
  loading,
  disabled,
  iconLeft,
  iconRight,
  children,
  ...props
}) => {
  // Set the button to disabled if it is loading or disabled
  disabled = disabled || loading;

  // The container classes are applied to the TouchableOpacity component
  // These classes are responsible for the background color, layout, etc.
  const containerClasses = tw.style(
    "flex flex-row items-center justify-center rounded-lg gap-2.5",
    !disabled && colorClasses[color].container.default, // Set the default color if the button is not disabled
    disabled && colorClasses[color].container.disabled, // Set the disabled color if the button is disabled
    sizeClasses[size].container,
    style,
  );

  // The text classes are applied to the Text component
  // These classes are responsible for the text color, font size, etc.
  const textClasses = tw.style(
    !disabled && colorClasses[color].text.default, // Set the default color if the button is not disabled
    disabled && colorClasses[color].text.disabled, // Set the disabled color if the button is disabled
    sizeClasses[size].text,
    loading && "opacity-0", // Hide the text if the button is loading
  );

  // The icon color is applied to the Icon component
  // This color is not using tw.style as we need to pass
  // a direct color value to the Icon component
  const iconColor = tw.color(
    disabled
      ? colorClasses[color].icon.disabled
      : colorClasses[color].icon.default,
  );

  // The icon size is applied to the Icon component
  // This size is not using tw.style as we need to pass
  // a direct size value to the Icon component
  const iconSize = sizeClasses[size].icon;

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      style={containerClasses}
      {...props}
    >
      {iconLeft && <Icon name={iconLeft} />}
      <Text style={textClasses}>{children}</Text>
      {loading && (
        <ActivityIndicator
          style={tw`absolute inset-0`}
          color={iconColor}
          size={iconSize}
        />
      )}
      {iconRight && <Icon name={iconRight} color={iconColor} size={iconSize} />}
    </TouchableOpacity>
  );
};

export default Button;

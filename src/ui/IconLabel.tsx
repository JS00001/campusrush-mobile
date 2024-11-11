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

import { View, ViewProps } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Icon, { IconType } from "@/ui/Icon";

export type IconLabelColor = "primary" | "secondary" | "tertiary";

export type IconLabelSize = "sm" | "md" | "lg";

interface IconLabelProps extends ViewProps {
  iconName: IconType;
  iconColor?: string;
  title?: string;
  subtitle?: string;
  style?: any;
  color?: IconLabelColor;
  size?: IconLabelSize;
}

/**
 * The sizes for all of the IconLabel components
 */
const IconLabelSizes = {
  sm: {
    icon: 16,
    container: { padding: 6 },
  },
  md: {
    icon: 20,
    container: { padding: 8 },
  },
  lg: {
    icon: 26,
    container: { padding: 14 },
  },
};

/**
 * The color for all of the IconLabel components
 */
const IconLabelColors = {
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

const IconLabel: React.FC<IconLabelProps> = ({
  style,
  iconName,
  iconColor,
  title,
  subtitle,
  size = "lg",
  color = "primary",
  ...props
}) => {
  const IconColor = iconColor || IconLabelColors[color].color;

  const containerStyles = tw.style("flex-row items-center gap-2", style);

  const iconContainerStyles = tw.style(
    "rounded-full flex-row items-center gap-x-2",
    IconLabelColors[color].container,
    IconLabelSizes[size].container,
  );

  return (
    <View style={containerStyles} {...props}>
      <View style={iconContainerStyles}>
        <Icon
          name={iconName}
          color={IconColor}
          size={IconLabelSizes[size].icon}
        />
      </View>

      <View>
        {title && <Text style={tw`text-primary`}>{title}</Text>}
        {subtitle && <Text>{subtitle}</Text>}
      </View>
    </View>
  );
};

export default IconLabel;

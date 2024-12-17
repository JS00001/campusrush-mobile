/*
 * Created on Tue Dec 17 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import type { IconType } from "@/constants/icons";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface StatusBadgeProps {
  color: keyof typeof ColorClasses;
  icon?: IconType;
  children: React.ReactNode;
  style?: any;
}

const ColorClasses = {
  success: {
    container: "bg-green-50 border-green-600/20",
    text: "text-green-700",
  },
  warning: {
    container: "bg-yellow-50 border-yellow-600/20",
    text: "text-yellow-700",
  },
  danger: {
    container: "bg-red-50 border-red-600/20",
    text: "text-red-700",
  },
  info: {
    container: "bg-blue-50 border-blue-600/20",
    text: "text-blue-700",
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({
  color,
  icon,
  children,
  style,
}) => {
  const textColor = ColorClasses[color].text;
  const containerColor = ColorClasses[color].container;

  const containerStyles = tw.style(
    "px-2 py-1 rounded-lg border",
    "self-start flex-row items-center justify-center gap-1",
    containerColor,
    style,
  );

  const textStyles = tw.style("text-xs", textColor);

  return (
    <View style={containerStyles}>
      {icon && <Icon icon={icon} size={12} color={tw.color(textColor)} />}
      <Text style={textStyles}>{children}</Text>
    </View>
  );
};

export default StatusBadge;

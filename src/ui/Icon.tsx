/*
 * Created on Tue Mar 05 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { ElementType } from "react";
import { View, ViewProps } from "react-native";
import * as PhosphorIcon from "phosphor-react-native";

import tw from "@/lib/tailwind";

export type IconType =
  | keyof typeof PhosphorIcon
  | `${keyof typeof PhosphorIcon}Fill`;

interface IconProps extends ViewProps {
  icon: IconType;
  color?: string;
  size?: number;
  weight?: "regular" | "fill" | "duotone";
}

const Icon: React.FC<IconProps> = ({
  icon,
  weight,
  size = 24,
  color = tw.color("primary"),
  ...props
}) => {
  const iconName = icon.split("Fill")[0];
  const IconComponent = PhosphorIcon[iconName] as ElementType;

  const iconWeight = icon.includes("Fill") ? "fill" : weight || "regular";

  return (
    <View {...props}>
      <IconComponent
        size={size}
        color={color}
        weight={iconWeight}
        duotoneOpacity={0.1}
        duotoneColor={tw.color("primary")}
      />
    </View>
  );
};

export default Icon;

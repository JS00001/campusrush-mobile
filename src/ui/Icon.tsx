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
import {
  RemixIcon,
  RemixIconProps,
  RemixIconType,
} from "@campusrush/remixicon-native";
import { View, ViewProps } from "react-native";

export type IconType = RemixIconType;

interface IconProps extends RemixIconProps, ViewProps {}

const Icon: React.FC<IconProps> = ({ name, size, color, ...props }) => {
  return (
    <View {...props}>
      <RemixIcon name={name} size={size} color={color} />
    </View>
  );
};

export default Icon;

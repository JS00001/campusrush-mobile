/*
 * Created on Wed Apr 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import React from "react";
import { TouchableOpacity } from "react-native";

import Badge, { BadgeSize } from "@/ui/Badge";

interface ToggleChipProps {
  size?: BadgeSize;
  value?: boolean;
  style?: any;
  children: React.ReactNode;
  onChange?: (value: boolean) => void;
}

const ToggleChip: React.FC<ToggleChipProps> = ({
  size = "md",
  value = false,
  children,
  style,
  onChange,
}) => {
  const badgeColor = value ? "primary" : "secondary";

  const onPress = () => {
    onChange && onChange(!value);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Badge color={badgeColor} size={size} style={style}>
        {children}
      </Badge>
    </TouchableOpacity>
  );
};

export default ToggleChip;

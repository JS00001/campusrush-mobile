/*
 * Created on Fri Mar 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import type { IconType } from "@/constants/icons";

import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import IconLabel from "@/ui/IconLabel";

export interface ActionItemProps extends TouchableOpacityProps {
  icon: IconType;
  title: string;
  style?: any;
  onPress: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({
  icon,
  title,
  style,
  onPress,
  ...props
}) => {
  const containerStyles = tw.style(
    "justify-between items-center p-3 flex-row bg-gray-100",
    style,
  );

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress} {...props}>
      <IconLabel size="md" title={title} iconName={icon} color="tertiary" />
      <Icon icon="CaretRight" size={18} />
    </TouchableOpacity>
  );
};

export default ActionItem;

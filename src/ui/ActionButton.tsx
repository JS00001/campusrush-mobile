/*
 * Created on Wed Mar 06 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Icon, { IconType } from "@/ui/Icon";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import tw from "@/lib/tailwind";

interface ActionButtonProps extends TouchableOpacityProps {
  icon: IconType;
  style?: any;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  style,
  ...props
}) => {
  const label = props["ph-label"] || "action-button";

  const containerStyles = tw.style(
    "absolute bottom-4 right-4 z-20",
    "p-4 rounded-full bg-primary shadow-lg self-end",
    style,
  );

  return (
    <TouchableOpacity ph-label={label} style={containerStyles} {...props}>
      <Icon icon={icon} color="white" size={28} />
    </TouchableOpacity>
  );
};

export default ActionButton;

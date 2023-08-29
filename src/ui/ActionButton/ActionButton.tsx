/*
 * Created on Tue Aug 29 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View } from "react-native";
import Icon from "react-native-remix-icon";
import { TouchableOpacityProps, TouchableOpacity } from "react-native";

import tw from "@/lib/tailwind";

interface ActionButtonProps extends TouchableOpacityProps {
  icon: string;
  style?: any;
  onPress?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  style,
  onPress,
  ...props
}) => {
  // Styling
  const containerClasses = tw.style(
    "z-20 w-full h-full justify-end",
    // Positioning
    "absolute bottom-6 right-6",
  );

  const buttonClasses = tw.style(
    // Default styles
    "p-5 rounded-full bg-primary shadow-lg self-end",
    // Custom styles
    style,
  );

  return (
    <View style={containerClasses}>
      {/* The Action button itself */}
      <TouchableOpacity {...props} onPress={onPress} style={buttonClasses}>
        <Icon name={icon} size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;

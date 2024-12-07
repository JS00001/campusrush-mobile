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

import { TouchableOpacity } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface NavigationTabProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const NavigationTab: React.FC<NavigationTabProps> = ({
  label,
  selected,
  onPress,
}) => {
  const containerStyles = tw.style(
    "py-1.5 flex-1 -bottom-px", // Move the container down 1px so the border is overlapping the container
    selected && "border-b border-primary",
  );

  const textStyles = tw.style(
    "text-center",
    selected && "text-primary font-semibold",
    !selected && "text-gray-500",
  );

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <Text type="p3" style={textStyles}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default NavigationTab;

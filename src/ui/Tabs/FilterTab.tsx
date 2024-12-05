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

interface FilterTabProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const FilterTab: React.FC<FilterTabProps> = ({ label, selected, onPress }) => {
  const containerStyles = tw.style(
    "rounded-lg py-1.5 px-6",
    selected && "bg-primary",
    !selected && "bg-gray-100",
  );

  const textStyles = tw.style(
    selected && "text-white font-semibold",
    !selected && "text-primary",
  );

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <Text type="p3" style={textStyles}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FilterTab;

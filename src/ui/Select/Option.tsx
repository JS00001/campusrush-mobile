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
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";

interface OptionProps {
  value: string;
  selected?: boolean;
  onPress?: () => void;
}

const Option: React.FC<OptionProps> = ({ value, selected, onPress }) => {
  const containerStyles = tw.style(
    "w-full px-6 py-4 justify-between items-center flex-row",
    "border-b border-gray-100",
  );

  const iconStyles = tw.style(
    selected && "opacity-100",
    !selected && "opacity-0",
  );

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      <Text style={tw`text-primary`}>{value}</Text>
      <Icon icon="Check" color={tw.color("primary")} style={iconStyles} />
    </TouchableOpacity>
  );
};

export default Option;

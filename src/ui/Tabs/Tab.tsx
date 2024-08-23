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

interface TabProps {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const Tab: React.FC<TabProps> = ({ label, selected, disabled, onPress }) => {
  const containerStyles = tw.style(
    "rounded-lg py-1.5 px-6",
    selected && "bg-primary",
    !selected && "bg-slate-100",
    disabled && "disabled",
  );

  const textStyles = tw.style(
    selected && "text-white font-semibold",
    !selected && "text-primary",
  );

  return (
    <TouchableOpacity
      disabled={disabled}
      style={containerStyles}
      onPress={onPress}
    >
      <Text type="p3" style={textStyles}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Tab;

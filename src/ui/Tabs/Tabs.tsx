/*
 * Created on Thu Dec 28 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { ScrollView, TouchableOpacity, View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface TabsProps {
  options: string[];
  selectedIndex: number;
  disabledIndexes?: number[];
  style?: any;
  onChange: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({
  options,
  selectedIndex,
  disabledIndexes,
  style,
  onChange,
}) => {
  const containerStyles = tw.style("gap-1", style);

  return (
    <View style={tw`w-full`}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={containerStyles}
        showsHorizontalScrollIndicator={false}
      >
        {options.map((option, index) => (
          <Tab
            key={option}
            label={option}
            selected={selectedIndex === index}
            disabled={disabledIndexes?.includes(index)}
            onPress={() => onChange(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

interface TabProps {
  label: string;
  selected: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const Tab: React.FC<TabProps> = ({ label, selected, disabled, onPress }) => {
  const containerClasses = tw.style(
    "rounded-full py-1.5 px-6",
    selected ? "bg-primary" : "bg-slate-100",
    disabled && "opacity-50",
  );

  const textClasses = tw.style(
    selected ? "text-white font-semibold" : "text-slate-500",
  );

  return (
    <TouchableOpacity
      style={containerClasses}
      onPress={onPress}
      disabled={disabled}
    >
      <Text variant="subtext" style={textClasses}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Tabs;

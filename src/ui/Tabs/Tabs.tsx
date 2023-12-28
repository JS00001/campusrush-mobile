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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { ScrollView, TouchableOpacity, View } from "react-native";

interface TabsProps {
  options: string[];
  selectedIndex: number;
  style?: any;
  onChange: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({
  options,
  selectedIndex,
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
  onPress: () => void;
}

const Tab: React.FC<TabProps> = ({ label, selected, onPress }) => {
  const containerClasses = tw.style(
    "rounded-full py-1.5 px-6",
    selected ? "bg-primary" : "bg-slate-200",
  );

  const textClasses = tw.style(
    selected ? "text-white font-semibold" : "text-slate-500",
  );

  return (
    <TouchableOpacity style={containerClasses} onPress={onPress}>
      <Text variant="subtext" style={textClasses}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Tabs;

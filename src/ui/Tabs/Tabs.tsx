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

import { View, ViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Tab from "./Tab";

import tw from "@/lib/tailwind";

interface TabsProps extends ViewProps {
  options: string[];
  currentIndex: number;
  disabledIndex?: number[];
  style?: any;
  onChange: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({
  options,
  currentIndex,
  disabledIndex = [],
  style,
  onChange,
  ...props
}) => {
  const contentStyle = tw.style("flex-row", style);
  const contentContainerStyles = tw.style("gap-1");

  return (
    <ScrollView
      horizontal
      style={contentStyle}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={contentContainerStyles}
    >
      {options.map((option, index) => {
        const isSelected = currentIndex === index;

        const handlePress = () => {
          onChange(index);
        };

        return (
          <Tab
            key={index}
            label={option}
            selected={isSelected}
            disabled={disabledIndex.includes(index)}
            onPress={handlePress}
          />
        );
      })}
    </ScrollView>
  );
};

export default Tabs;

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

import { ScrollViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import FilterTab from "./FilterTab";
import NavigationTab from "./NavigationTab";

import tw from "@/lib/tailwind";

interface TabsProps extends ScrollViewProps {
  tabs: string[];
  currentIndex: number;
  type?: "filter" | "navigation";
  style?: any;
  contentContainerStyle?: any;
  onChange: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  currentIndex,
  type = "filter",
  style,
  contentContainerStyle,
  onChange,
}) => {
  const contentStyle = tw.style(
    "grow-0",
    type === "navigation" && "border-b border-gray-200",
    style,
  );

  const contentContainerStyles = tw.style(
    "gap-1 min-w-full",
    contentContainerStyle,
  );

  return (
    <ScrollView
      horizontal
      style={contentStyle}
      scrollEnabled={type === "filter"}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={contentContainerStyles}
    >
      {tabs.map((option, index) =>
        type === "filter" ? (
          <FilterTab
            key={index}
            label={option}
            selected={currentIndex === index}
            onPress={() => onChange(index)}
          />
        ) : (
          <NavigationTab
            key={index}
            label={option}
            selected={currentIndex === index}
            onPress={() => onChange(index)}
          />
        ),
      )}
    </ScrollView>
  );
};

export default Tabs;

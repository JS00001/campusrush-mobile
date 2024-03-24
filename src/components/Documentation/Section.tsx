/*
 * Created on Sun Mar 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface SectionProps {
  children?: React.ReactNode;
  options: {
    title: string;
    value: string | React.ReactNode;
  }[];
}

const Section: React.FC<SectionProps> = ({ options, children }) => {
  return (
    <View style={tw`border-b border-slate-200 pb-4 gap-y-2`}>
      {options.map((option, index) => (
        <View style={tw`flex-row justify-between w-full`} key={index}>
          <Text type="p2">{option.title}</Text>
          <Text type="p2" style={tw`text-primary`}>
            {option.value}
          </Text>
        </View>
      ))}

      {children}
    </View>
  );
};

export default Section;

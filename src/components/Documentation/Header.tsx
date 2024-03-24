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

import React from "react";
import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface HeaderProps {
  options: {
    title: string;
    value: string | React.ReactNode;
  }[];
}

const Header: React.FC<HeaderProps> = ({ options }) => {
  return (
    <View style={tw`border-b border-slate-200 py-4 gap-y-4`}>
      {options.map((option, index) => (
        <View style={tw`flex-row justify-between w-full`} key={index}>
          <Text type="p1">{option.title}</Text>
          {typeof option.value === "string" ? (
            <Text type="p1">{option.value}</Text>
          ) : (
            option.value
          )}
        </View>
      ))}
    </View>
  );
};

export default Header;

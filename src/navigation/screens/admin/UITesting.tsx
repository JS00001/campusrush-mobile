/*
 * Created on Sun Sep 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View, ScrollView } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import ActionButton from "@/ui/ActionButton";
import Badge from "@/ui/Badge";
import Button from "@/ui/Button";
import ButtonGroup from "@/ui/ButtonGroup";
import IconLabel from "@/ui/IconLabel";
import { Detail } from "@/ui/DetailView";
import Select from "@/ui/Select/Select";
import { useState } from "react";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ScrollView contentContainerStyle={tw`pt-20 h-full gap-y-4 px-6`}>
      <Select
        value={value}
        placeholder="School Name"
        options={["Option 1", "Option 2"]}
        onChange={(value) => setValue(value)}
      />
    </ScrollView>
  );
};

export default UITesting;

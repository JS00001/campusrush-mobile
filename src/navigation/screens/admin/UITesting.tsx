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

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={tw`pt-20 h-full gap-y-4 px-2`}>
      <IconLabel
        iconName="mail-line"
        title="Mail"
        subtitle="This is a mail icon"
      />
      <IconLabel
        iconName="mail-line"
        title="Mail"
        subtitle="This is a mail icon"
        color="secondary"
      />
      <IconLabel
        iconName="mail-line"
        title="Mail"
        subtitle="This is a mail icon"
        size="md"
      />
      <IconLabel
        iconName="mail-line"
        title="Mail"
        subtitle="This is a mail icon"
        color="secondary"
        size="md"
      />
      <IconLabel
        iconName="mail-line"
        title="Mail"
        subtitle="This is a mail icon"
        size="sm"
      />
      <IconLabel
        iconName="mail-line"
        title="Mail"
        subtitle="This is a mail icon"
        color="secondary"
        size="sm"
      />
    </ScrollView>
  );
};

export default UITesting;

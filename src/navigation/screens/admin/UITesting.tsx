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

import { View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import ActionButton from "@/ui/ActionButton";

interface UITestingProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITesting: React.FC<UITestingProps> = ({ navigation }) => {
  return (
    <>
      <ActionButton icon="add-fill" />
      <View style={tw`mt-48 px-6 gap-y-2`}>
        <ListItem
          size="sm"
          title="Title"
          subtitle="Subtitle"
          icon="account-box-fill"
        />

        <ListItem title="Title" subtitle="Subtitle" />
        <ListItem
          title="Title"
          subtitle="Subtitle"
          icon="star-fill"
          iconColor={tw.color("yellow")}
        />
        <ListItem
          title="Title"
          subtitle="Subtitle"
          icon="star-fill"
          size="lg"
        />
        <ListItem
          title="Title"
          subtitle="Subtitle"
          icon="star-fill"
          size="lg"
        />
      </View>
    </>
  );
};

export default UITesting;

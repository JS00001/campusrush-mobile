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

import tw from "@/lib/tailwind";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "react-native";
import ListItem from "@/ui/ListItem";

interface UITestingScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITestingScreen: React.FC<UITestingScreenProps> = ({ navigation }) => {
  return (
    <View style={tw`w-full flex-row gap-5 mt-20 px-4`}>
      <ListItem
        size="sm"
        pressable={false}
        icon="user-fill"
        titleStyle={tw`text-[32px] font-semibold leading-9`}
        title={"0"}
        subtitle="Current PNMs registered to rush"
      />

      <ListItem
        size="sm"
        pressable={false}
        icon="user-star-fill"
        titleStyle={tw`text-[32px] font-semibold`}
        title={"0"}
        subtitle="PNMs saved as favorites"
      />
    </View>
  );
};

export default UITestingScreen;

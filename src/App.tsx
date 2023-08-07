/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import tw from "@/lib/tailwind";

const App = () => {
  return (
    <View style={tw`bg-red-500`}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

registerRootComponent(App);

export default App;

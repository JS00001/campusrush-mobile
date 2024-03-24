/*
 * Created on Thu Sep 14 2023
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

import HeaderBackground from "./Header";

import tw from "@/lib/tailwind";

const HomeBackground = () => {
  return (
    <View style={tw`absolute w-full h-full`}>
      <HeaderBackground />

      <View style={tw`bg-white absolute h-48 z-10 w-full bottom-0`} />
    </View>
  );
};

export default HomeBackground;

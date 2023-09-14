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

import tw from "@/lib/tailwind";
import HeaderSvg from "@/assets/HeaderSvg";

interface HomeHeaderSvgProps {}

const HomeHeaderSvg: React.FC<HomeHeaderSvgProps> = () => {
  return (
    <View style={tw`absolute`}>
      <HeaderSvg />
      <View style={tw`bg-white absolute h-full z-10 w-full top-68`} />
    </View>
  );
};

export default HomeHeaderSvg;

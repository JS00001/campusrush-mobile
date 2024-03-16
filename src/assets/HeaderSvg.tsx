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

import tw from "@/lib/tailwind";
import { View } from "react-native";

interface HeaderSvgProps {}

const HeaderSvg: React.FC<HeaderSvgProps> = () => {
  return (
    <View style={tw`w-full h-full bg-primary overflow-hidden`}>
      <View
        style={tw`w-96 h-[400px] rounded-full -top-44 -left-24 bg-navy-100 absolute z-10`}
      />
      <View
        style={tw`w-[500px] h-[550px] rounded-full -top-64 -left-28 bg-navy-200 absolute`}
      />
    </View>
  );
};

export default HeaderSvg;

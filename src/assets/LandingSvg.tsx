/*
 * Created on Thu Aug 10 2023
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
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

import tw from "@/lib/tailwind";

interface LandingSvgProps {}

const LandingSvg: React.FC<LandingSvgProps> = () => {
  return (
    <View style={tw`bg-primary absolute -z-10`}>
      <Svg
        width={391}
        height={844}
        fill="none"
      >
        <Path
          fill="url(#a)"
          d="m104.934 499.605 99.205 338.282a8.507 8.507 0 0 0 8.163 6.113h177.59a.608.608 0 0 0 .608-.608V.608a.608.608 0 0 0-.608-.608h-183.96l-100.18 329.803a296.83 296.83 0 0 0-.818 169.802Z"
        />
        <Defs>
          <LinearGradient
            id="a"
            x1={47.45}
            x2={390.598}
            y1={422}
            y2={419.187}
            gradientUnits="userSpaceOnUse"
          >
            <Stop
              stopColor="#131E5B"
              stopOpacity={0.45}
            />
            <Stop
              offset={1}
              stopColor="#010D4F"
            />
          </LinearGradient>
        </Defs>
      </Svg>
    </View>
  );
};

export default LandingSvg;

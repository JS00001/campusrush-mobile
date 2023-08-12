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

import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

interface Logo32SvgProps {}

const Logo32Svg: React.FC<Logo32SvgProps> = () => {
  return (
    <Svg width={54} height={32} fill="none">
      <Path
        fill="url(#a)"
        d="M51.86 7.433 28.617.292a6.657 6.657 0 0 0-3.9 0L1.472 7.433c-1.961.603-1.961 3.197 0 3.8l4.053 1.245 2.895.89 3.747 1.151 12.55 3.856c.755.232 2.203.52 3.9 0l6.254-1.922 6.254-1.921 10.737-3.299c1.962-.603 1.962-3.196 0-3.8Z"
      />
      <Path
        fill="#fff"
        fillOpacity={0.85}
        d="M28.615 18.375a6.664 6.664 0 0 1-3.899 0l-12.55-3.856-.318 2.693 12.085 3.712a9.328 9.328 0 0 0 5.465 0l12.086-3.713-.36-2.679-6.254 1.921-6.255 1.922Z"
      />
      <Path
        fill="#fff"
        fillOpacity={0.75}
        d="M29.398 20.924a9.328 9.328 0 0 1-5.465 0l-12.085-3.712-1.182 9.455c0 2.945 7.163 5.333 16 5.333s16-2.387 16-5.333l-1.182-9.456-12.086 3.713Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={26.666}
          x2={26.666}
          y1={0}
          y2={18.56}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0.9} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default Logo32Svg;

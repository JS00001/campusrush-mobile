/*
 * Created on Wed Nov 1 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const InfoIcon = () => (
  <Svg width={56} height={56} fill="none">
    <Circle cx={28} cy={28} r={28} fill="url(#a)" />
    <Circle cx={28} cy={28} r={18.813} fill="#5649EB" />
    <Path
      fill="#fff"
      d="M28 35a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm0-17a6 6 0 0 1 6 6c0 2.165-.753 3.29-2.674 4.923C29.399 30.56 29 31.297 29 33h-2c0-2.474.787-3.695 3.031-5.601C31.548 26.11 32 25.434 32 24a4 4 0 1 0-8 0v1h-2v-1a6 6 0 0 1 6-6Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={56}
        x2={0}
        y1={28}
        y2={28}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#595FEC" />
        <Stop offset={1} stopColor="#595FEC" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default InfoIcon;

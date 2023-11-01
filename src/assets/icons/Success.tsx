/*
 * Created on Tue Oct 24 2023
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

const SuccessIcon = () => (
  <Svg width={56} height={56} fill="none">
    <Circle cx={28} cy={28} r={28} fill="url(#a)" />
    <Circle cx={28} cy={27.781} r={18.813} fill="#22c55e" />
    <Path
      fill="#000"
      d="m25.576 31.56 10.641-10.639 1.637 1.637-12.277 12.277-7.367-7.367 1.637-1.637 5.73 5.73h-.001Z"
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
        <Stop stopColor="#59EC68" />
        <Stop offset={1} stopColor="#22c55e" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SuccessIcon;

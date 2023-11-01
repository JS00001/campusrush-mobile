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

const ErrorIcon = () => (
  <Svg width={56} height={56} fill="none">
    <Circle cx={28} cy={28} r={28} fill="url(#a)" />
    <Circle cx={28} cy={28} r={18.813} fill="#ef4444" />
    <Path
      fill="#fff"
      d="m27.89 26.254 5.73-5.73 1.639 1.638-5.73 5.73 5.73 5.73-1.639 1.636-5.73-5.73-5.73 5.73-1.635-1.638 5.73-5.73-5.73-5.73 1.636-1.634 5.73 5.73v-.002Z"
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
        <Stop stopColor="#f87171" />
        <Stop offset={1} stopColor="#EC5959" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default ErrorIcon;

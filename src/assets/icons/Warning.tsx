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

const WarningIcon = () => (
  <Svg width={56} height={56} fill="none">
    <Circle cx={28} cy={28} r={28} fill="url(#a)" />
    <Circle cx={28} cy={28} r={18.813} fill="#EBC349" />
    <Path fill="#000" d="M28 19.469h2.87v12.757H28zM28 33.661h2.87v2.87H28z" />
    <Defs>
      <LinearGradient
        id="a"
        x1={56}
        x2={0}
        y1={28}
        y2={28}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#ECCB59" />
        <Stop offset={1} stopColor="#ECCB59" stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default WarningIcon;

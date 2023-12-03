/*
 * Created on Thu Nov 30 2023
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

const UpgradeIcon = () => (
  <Svg width={56} height={57} fill="none">
    <Circle cx={28} cy={28.5} r={28} fill="url(#a)" />
    <Circle cx={28} cy={28.5} r={18.813} fill="#03014F" />
    <Path
      fill="#fff"
      d="m33 18.208 1.32 2.473L36.792 22l-2.472 1.319L33 25.79l-1.317-2.47L29.21 22l2.473-1.318L33 18.208Zm-6.333 8.125 5 2.667-5 2.666-2.666 5-2.667-5-5-2.666 5-2.667 2.667-5 2.666 5Zm.75 2.667-2.227-1.19-1.189-2.227-1.189 2.228L20.584 29l2.228 1.188 1.189 2.228 1.188-2.228L27.417 29Zm8.25 4.333-1.666-3.125-1.667 3.125L29.209 35l3.125 1.666 1.667 3.125 1.666-3.125L38.792 35l-3.125-1.667Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={56}
        x2={0}
        y1={28.5}
        y2={28.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#03014F" />
        <Stop offset={1} stopColor="#03014F" stopOpacity={0.1} />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default UpgradeIcon;

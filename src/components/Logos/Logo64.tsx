/*
 * Created on Sun Mar 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const Logo64 = () => {
  return (
    <Svg width={107} height={64} fill="none">
      <Path
        fill="url(#a)"
        d="M103.722 14.867 57.232.584a13.314 13.314 0 0 0-7.798 0L2.942 14.867c-3.923 1.205-3.923 6.393 0 7.598l8.105 2.49 5.79 1.78 7.495 2.303 25.1 7.712a13.33 13.33 0 0 0 7.798 0l12.51-3.843 12.509-3.843 21.473-6.597c3.925-1.207 3.925-6.393 0-7.6Z"
      />
      <Path
        fill="#fff"
        fillOpacity={0.85}
        d="M57.23 36.75a13.33 13.33 0 0 1-7.798 0l-25.1-7.712-.636 5.385 24.17 7.425a18.657 18.657 0 0 0 10.931 0l24.172-7.426-.72-5.358-12.51 3.843L57.23 36.75Z"
      />
      <Path
        fill="#fff"
        fillOpacity={0.75}
        d="M58.797 41.849a18.657 18.657 0 0 1-10.931 0l-24.17-7.425-2.364 18.91c0 5.891 14.327 10.666 32 10.666 17.673 0 32-4.775 32-10.667l-2.363-18.911-24.172 7.427Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={53.333}
          x2={53.333}
          y1={0}
          y2={37.12}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop offset={1} stopColor="#fff" stopOpacity={0.9} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default Logo64;

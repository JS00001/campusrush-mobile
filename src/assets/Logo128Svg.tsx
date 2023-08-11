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

interface Logo128SvgProps {}

const Logo128Svg: React.FC<Logo128SvgProps> = () => {
  return (
    <Svg
      width={214}
      height={128}
      fill="none"
    >
      <Path
        fill="url(#a)"
        d="m207.444 29.734-92.98-28.567a26.627 26.627 0 0 0-15.596 0L5.885 29.734c-7.847 2.41-7.847 12.787 0 15.197l16.21 4.98 11.58 3.56 14.99 4.605 50.2 15.424c3.019.927 8.813 2.084 15.596 0l25.018-7.686 25.018-7.686 42.947-13.194c7.85-2.413 7.85-12.787 0-15.2Z"
      />
      <Path
        fill="#fff"
        fillOpacity={0.85}
        d="M114.461 73.5c-6.783 2.084-12.577.927-15.597 0l-50.2-15.424-1.273 10.771 48.34 14.85c4.25 1.307 12.353 2.92 21.863 0l48.343-14.853-1.44-10.716-25.018 7.686-25.018 7.686Z"
      />
      <Path
        fill="#fff"
        fillOpacity={0.75}
        d="M117.594 83.697c-9.51 2.92-17.613 1.307-21.863 0l-48.34-14.85-4.726 37.82c0 11.783 28.653 21.333 63.999 21.333 35.347 0 64-9.55 64-21.333l-4.727-37.823-48.343 14.853Z"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={106.666}
          x2={106.666}
          y1={0}
          y2={74.24}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" />
          <Stop
            offset={1}
            stopColor="#fff"
            stopOpacity={0.9}
          />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default Logo128Svg;

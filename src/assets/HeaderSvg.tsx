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

import Svg, { Path } from "react-native-svg";

interface HeaderSvgProps {}

const HeaderSvg: React.FC<HeaderSvgProps> = () => {
  return (
    <Svg width={390} height={844} fill="none">
      <Path fill="#03014F" d="M0 0h390v844H0V0Z" />
      <Path
        fill="#010D4F"
        d="M0 312.936V0h390v198.955C344.453 295.877 253.398 362 148.5 362 93.722 362 42.719 343.969 0 312.936Z"
      />
      <Path
        fill="#0B1652"
        d="M62.5 263C202.504 263 316 151.071 316 13c0-4.36-.113-8.695-.337-13H0v255.344c19.992 5 40.931 7.656 62.5 7.656Z"
      />
    </Svg>
  );
};

export default HeaderSvg;

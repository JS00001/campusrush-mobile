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
    <Svg width={390} height={846} fill="none" style={{ marginTop: -10 }}>
      <Path fill="#03014F" d="M0 2h390v844H0V2Z" />
      <Path
        fill="#010D4F"
        d="M0 292V2h390v118c-45.547 96.922-136.602 212.545-241.5 212.545-54.778 0-105.781-9.512-148.5-40.545Z"
      />
      <Path
        fill="#0B1652"
        d="M51.5 252C191.504 252 305 140.071 305 2c0-4.36.224 4.305 0 0H0v244.5c19.992 4.999 29.931 5.5 51.5 5.5Z"
      />
    </Svg>
  );
};

export default HeaderSvg;

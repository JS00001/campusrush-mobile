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

import tw from "@/lib/tailwind";
import { View } from "react-native";

const HeaderBackground = () => {
  const backgroundStyles = tw.style("w-full h-full overflow-hidden bg-primary");

  const firstCircleStyles = tw.style(
    // Styling
    "rounded-full bg-navy-100",
    // Sizing
    "w-96 h-[400px]",
    // Positioning
    "absolute z-10 -top-44 -left-24",
  );

  const secondCircleStyles = tw.style(
    // Styling
    "rounded-full bg-navy-200",
    // Sizing
    "w-[500px] h-[550px]",
    // Positioning
    "absolute -top-64 -left-28",
  );

  return (
    <View style={backgroundStyles}>
      <View style={firstCircleStyles} />
      <View style={secondCircleStyles} />
    </View>
  );
};

export default HeaderBackground;

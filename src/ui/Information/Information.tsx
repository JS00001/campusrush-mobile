/*
 * Created on Tue Nov 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useState } from "react";
import RemixIcon from "react-native-remix-icon";
import { TouchableOpacity, View } from "react-native";

import tw from "@/lib/tailwind";
import Tooltip from "@/ui/Tooltip";

interface InformationProps {
  tooltip: string;
  size?: keyof typeof sizes;
  style?: any;
}

/**
 * The sizes of the information icon.
 *
 * The touch area is the area that the user can press to show the tooltip.
 * This does not increase the size of the element itself since it is absolute.
 */
const sizes = {
  sm: {
    size: 16,
    touchAreaClasses: tw.style("p-3 -top-1 -left-1"),
  },
  md: {
    size: 20,
    touchAreaClasses: tw.style("p-3 -top-0.5 -left-0.5"),
  },
  lg: {
    size: 24,
    touchAreaClasses: tw.style("p-4 -top-1 -left-1"),
  },
};

const Information: React.FC<InformationProps> = ({
  tooltip,
  size = "md",
  style,
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // When the user presses the touch area, toggle the tooltip
  const handlePress = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  // Styling
  const touchAreaClasses = tw.style(
    // The styles that all touch areas share
    "absolute opacity-50 w-full h-full ",
    // The custom padding (increases the touch area)
    sizes[size].touchAreaClasses,
  );

  return (
    <Tooltip
      text={tooltip}
      isVisible={isTooltipVisible}
      onClose={handlePress}
      parentWrapperStyle={style}
    >
      <View style={tw`relative`}>
        <RemixIcon
          name="ri-information-line"
          size={sizes[size].size}
          color={tw.color("slate-400")}
        />

        <TouchableOpacity onPress={handlePress} style={touchAreaClasses} />
      </View>
    </Tooltip>
  );
};

export default Information;

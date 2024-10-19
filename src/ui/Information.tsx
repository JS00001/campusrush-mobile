/*
 * Created on Fri Mar 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useState } from "react";
import { TouchableOpacity, View, ViewProps } from "react-native";

import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import Tooltip from "@/ui/Tooltip";

export type InformationSize = "sm" | "md" | "lg";

interface InformationProps extends ViewProps {
  tooltip?: string;
  size?: InformationSize;
  style?: any;
  onPress?: () => void;
}

/**
 * The sizes of the information button
 */
const InformationSizes = {
  sm: {
    size: 16,
    touchAreaStyles: tw.style("p-3 -top-1 -left-1"),
  },
  md: {
    size: 20,
    touchAreaStyles: tw.style("p-3 -top-0.5 -left-0.5"),
  },
  lg: {
    size: 24,
    touchAreaStyles: tw.style("p-4 -top-1 -left-1"),
  },
};

const Information: React.FC<InformationProps> = ({
  tooltip,
  size = "md",
  style,
  onPress,
  ...props
}) => {
  const label = props["ph-label"] || "information";
  const [isVisible, setIsVisible] = useState(false);

  /**
   * When the button is pressed, toggle the visibility if there is a tooltip.
   * Otherwise, call the onPress function.
   */
  const handlePress = () => {
    if (tooltip) {
      setIsVisible((prev) => !prev);
    }

    onPress?.();
  };

  const containerStyles = tw.style("relative", style);

  const touchAreaStyles = tw.style(
    "absolute opacity-50 w-full h-full",
    InformationSizes[size].touchAreaStyles,
  );

  if (!tooltip) {
    return (
      <View ph-label={label} style={containerStyles} {...props}>
        <Icon
          name="information-line"
          size={InformationSizes[size].size}
          color={tw.color("gray-400")}
        />
        {/* Touch area for the icon */}
        <TouchableOpacity onPress={handlePress} style={touchAreaStyles} />
      </View>
    );
  }

  return (
    <Tooltip
      content={tooltip}
      isVisible={isVisible}
      onClose={handlePress}
      parentWrapperStyle={style}
    >
      <View ph-label={label} style={containerStyles} {...props}>
        <Icon
          name="information-line"
          size={InformationSizes[size].size}
          color={tw.color("gray-400")}
        />
        {/* Touch area for the icon */}
        <TouchableOpacity onPress={handlePress} style={touchAreaStyles} />
      </View>
    </Tooltip>
  );
};

export default Information;

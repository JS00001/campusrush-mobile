/*
 * Created on Wed Apr 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, View, ViewProps } from "react-native";

import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import Text, { TextType } from "@/ui/Text";

export type FilterChipColor = "primary" | "secondary";

export type FilterChipSize = "sm" | "md" | "lg";

interface FilterChipProps extends ViewProps {
  size?: FilterChipSize;
  color?: FilterChipColor;
  style?: any;
  onRemove?: () => void;
}

/**
 * The color of the chip
 */
const FilterChipColors = {
  primary: {
    text: "text-white",
    container: "bg-primary",
    closeButtonText: "text-primary",
    closeButtonContainer: "bg-slate-100",
  },
  secondary: {
    text: "text-primary",
    container: "bg-slate-100",
    closeButtonText: "text-slate-100",
    closeButtonContainer: "bg-primary",
  },
};

/**
 * The size of the chip
 */
const FilterChipSizes = {
  sm: {
    container: "py-0.5 pl-3 pr-[3px]",
    text: "p4",
    closeButton: 12,
  },
  md: {
    container: "py-1 pl-4 pr-[5px]",
    text: "p3",
    closeButton: 18,
  },
  lg: {
    container: "py-1.5 pl-5 pr-[7px]",
    text: "p2",
    closeButton: 20,
  },
};

const FilterChip: React.FC<FilterChipProps> = ({
  size = "md",
  color = "primary",
  style,
  children,
  onRemove,
  ...props
}) => {
  const textColor = FilterChipColors[color].text;
  const containerColorStyle = FilterChipColors[color].container;
  const closeButtonTextColor = FilterChipColors[color].closeButtonText;
  // prettier-ignore
  const closeButtonContainerColorStyle = FilterChipColors[color].closeButtonContainer;

  const textType = FilterChipSizes[size].text as TextType;
  const containerSizeStyle = FilterChipSizes[size].container;
  const closeButtonSize = FilterChipSizes[size].closeButton;

  const containerStyles = tw.style(
    "rounded-full justify-center items-center flex-row self-start gap-2",
    containerColorStyle,
    containerSizeStyle,
    style,
  );

  const textStyles = tw.style(textColor);

  const closeButtonContainerStyles = tw.style(
    "rounded-full justify-center items-center",
    closeButtonContainerColorStyle,
  );

  return (
    <View style={containerStyles} {...props}>
      <Text type={textType} style={textStyles}>
        {children}
      </Text>

      <TouchableOpacity style={closeButtonContainerStyles} onPress={onRemove}>
        <Icon
          name="close-line"
          size={closeButtonSize}
          color={tw.color(closeButtonTextColor)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FilterChip;

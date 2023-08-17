/*
 * Created on Tue Aug 08 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { Text as RNText } from "react-native";

import tw from "@/lib/tailwind";

// This is a hack to disable font scaling for all text components
interface TextWithDefaultProps extends RNText {
  defaultProps?: { allowFontScaling?: boolean };
}

// This is a hack to disable font scaling for all text components
const TextWithNoFontScaling = Object.assign(RNText, {
  defaultProps: {
    ...(RNText as unknown as TextWithDefaultProps).defaultProps,
    allowFontScaling: false,
  },
});

interface TextProps {
  variant?: keyof typeof variantClasses;
  children?: React.ReactNode;
  style?: any;
}

/**
 * Variant classes provide the proper font size and font weight for the text
 * component.
 */
export const variantClasses = {
  header: tw.style("text-[32px] font-DMSans_Bold"),
  title: tw.style("text-lg font-medium"),
  body: tw.style("text-base font-normal"),
  text: tw.style("text-sm font-normal"),
  subtext: tw.style("text-xs font-normal"),
};

const Text: React.FC<TextProps> = ({
  variant = "text",
  children,
  style,
  ...props
}) => {
  // Styling
  const textStyle = tw.style(
    // The proper variant class is selected based on the variant prop
    variantClasses[variant],
    // Add custom styles if provided
    style,
  );

  return (
    <TextWithNoFontScaling style={textStyle} {...props}>
      {children}
    </TextWithNoFontScaling>
  );
};

export default Text;

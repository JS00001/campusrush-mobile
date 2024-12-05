/*
 * Created on Mon Mar 04 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { Text as RNText, TextProps as RNTextProps } from "react-native";

import tw from "@/lib/tailwind";

// This is a hack to disable font scaling for all text components
const TextWithNoFontScaling = Object.assign(RNText, {
  defaultProps: {
    ...(RNText as any).defaultProps,
    allowFontScaling: false,
  },
});

export type TextType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p1"
  | "p2"
  | "p3"
  | "p4"
  | "p5"
  | "custom";

export interface TextProps extends RNTextProps {
  type?: TextType;
  style?: any;
}

const TextTypes = {
  h1: tw.style("text-[28px] font-DMSans_Bold text-primary"),
  h2: tw.style("text-2xl font-semibold text-primary"),
  h3: tw.style("text-xl font-medium text-primary"),
  h4: tw.style("text-lg font-medium text-primary"),
  p1: tw.style("text-lg text-gray-500"),
  p2: tw.style("text-base text-gray-500"),
  p3: tw.style("text-sm text-gray-500"),
  p4: tw.style("text-xs text-gray-500"),
  p5: tw.style("text-[10px] text-gray-500"),
  custom: tw.style(""),
};

const Text: React.FC<TextProps> = ({
  type = "p2",
  children,
  style,
  ...props
}) => {
  const textStyles = tw.style(TextTypes[type], style);

  return (
    <TextWithNoFontScaling style={textStyles} {...props}>
      {children}
    </TextWithNoFontScaling>
  );
};

export default Text;

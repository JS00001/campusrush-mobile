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

import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import Text from "@/ui_v1/Text";
import tw from "@/lib/tailwind";

interface HyperlinkProps extends TouchableOpacityProps {
  color?: keyof typeof colorClasses;
  style?: any;
  children: React.ReactNode;
}

/**
 * Color classes provide the proper colors for the text component of the
 * hyperlink.
 */
const colorClasses = {
  dark: tw.style("text-primary"),
  light: tw.style("text-white"),
};

const Hyperlink: React.FC<HyperlinkProps> = ({
  color = "dark",
  children,
  style,
  ...props
}) => {
  // Styling
  const textClasses = tw.style(
    // Base styles
    "underline font-semibold",
    // The proper color class is selected based on the color prop
    colorClasses[color],
    // The provided style prop is applied
    style,
  );

  return (
    <TouchableOpacity {...props}>
      <Text style={textClasses}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Hyperlink;

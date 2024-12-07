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

import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

export type HyperlinkColor = "primary" | "secondary";

interface HyperlinkProps extends TouchableOpacityProps {
  color?: HyperlinkColor;
  style?: any;
}

/**
 * The colors of the hyperlink
 */
const HyperlinkColors = {
  primary: "text-primary",
  secondary: "text-gray-100",
};

const Hyperlink: React.FC<HyperlinkProps> = ({
  color = "primary",
  style,
  children,
  ...props
}) => {
  const textStyles = tw.style(
    "underline font-semibold",
    HyperlinkColors[color],
    style,
  );

  return (
    <TouchableOpacity {...props}>
      <Text type="p3" style={textStyles}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Hyperlink;

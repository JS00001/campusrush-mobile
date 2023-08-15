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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface HyperlinkProps extends TouchableOpacityProps {
  color?: keyof typeof colorClasses;
  children: React.ReactNode;
}

const colorClasses = {
  dark: tw.style("text-primary"),
  light: tw.style("text-white"),
};

const Hyperlink: React.FC<HyperlinkProps> = ({
  color = "dark",
  children,
  ...props
}) => {
  const textClasses = tw.style("underline font-semibold", colorClasses[color]);

  return (
    <TouchableOpacity {...props}>
      <Text style={textClasses}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Hyperlink;

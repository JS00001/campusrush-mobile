/*
 * Created on Fri Sep 08 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface BadgeProps {
  children: React.ReactNode;
  style?: any;
  size?: keyof typeof sizeClasses;
}

/**
 * Size classes provide the proper sizes for the container
 * of the badge.
 */
const sizeClasses = {
  sm: tw.style("py-0.5 px-3"),
  md: tw.style("py-1 px-4"),
  lg: tw.style("py-1.5 px-5"),
};

/**
 * Text variants provide the proper text variants for the text
 * of the badge.
 */
const textVariants = {
  sm: "subtext",
  md: "subtext",
  lg: "text",
};

const Badge: React.FC<BadgeProps> = ({ children, style, size = "sm" }) => {
  // Get variant based on size
  const variant = textVariants[size] as any;

  // Styling
  const containerClasses = tw.style(
    // Styles applying to all sizes
    "bg-primary rounded-lg justify-center items-center",
    // Styles applying to specific sizes
    size && sizeClasses[size],
    // Custom styles
    style,
  );

  return (
    <View style={containerClasses}>
      <Text variant={variant} style={tw`text-white`}>
        {children}
      </Text>
    </View>
  );
};

export default Badge;

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

import RemixIcon from "react-native-remix-icon";
import { TouchableOpacity, View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface BadgeProps {
  style?: any;
  children: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  size?: keyof typeof sizeClasses;
}

/**
 * Size classes provide the proper sizes for the container
 * of the badge.
 */
const sizeClasses = {
  sm: tw.style("py-0.5 px-3"),
  md: tw.style("py-1.5 px-4"),
  lg: tw.style("py-2.5 px-5"),
};

/**
 * Text variants provide the proper text variants for the text
 * of the badge.
 */
const textVariants = {
  sm: "p4",
  md: "p4",
  lg: "p3",
};

const Badge: React.FC<BadgeProps> = ({
  children,
  style,
  size = "sm",
  removable,
  onRemove,
}) => {
  // Get variant based on size
  const variant = textVariants[size] as any;

  // Styling
  const containerClasses = tw.style(
    // Styles applying to all sizes
    "bg-primary rounded-full justify-center items-center flex-row self-start",
    // Styles applying to specific sizes
    size && sizeClasses[size],
    // If there is a removable icon, add padding to the right
    removable && tw.style("pr-8"),
    // Custom styles
    style,
  );

  return (
    <View style={containerClasses}>
      <Text type={variant} style={tw`text-white`}>
        {children}
      </Text>

      {removable && (
        <TouchableOpacity
          onPress={onRemove}
          style={tw`py-3 pr-3 pl-6 absolute -right-1`}
        >
          <View style={tw`bg-slate-100 rounded-full`}>
            <RemixIcon
              name="ri-close-line"
              size={14}
              color={tw.color("primary")}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Badge;

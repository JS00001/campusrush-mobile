/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import tw from "@/lib/tailwind";
import { TouchableOpacity, View } from "react-native";
import RemixIcon from "react-native-remix-icon";
import Text from "@/ui/Text";

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon: string;
  size?: keyof typeof sizeClasses;
  onPress: () => void;
  style?: any;
}

const sizeClasses = {
  sm: {
    container: tw.style("p-3 flex-1"),
    childContainer: tw.style("flex-col gap-y-2.5"),
  },
  lg: {
    container: tw.style(
      "px-6 py-5 w-full flex-row items-center justify-between",
    ),
    childContainer: tw.style("flex-row items-center justify-center gap-4"),
  },
};

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  subtitle,
  icon,
  size = "lg",
  onPress,
  style,
}) => {
  // Styling
  const containerClasses = tw.style(
    // Common classes
    "rounded-md bg-slate-100",
    // The size of the card
    sizeClasses[size].container,
    // Custom styles
    style,
  );

  const childContainerClasses = tw.style(
    // Common classes
    // Custom layouts for both sizes
    sizeClasses[size].childContainer,
  );

  return (
    <TouchableOpacity style={containerClasses} onPress={onPress}>
      <View style={childContainerClasses}>
        <View
          style={tw.style(
            size == "sm" && "p-2 rounded-sm bg-slate-200 self-start",
          )}
        >
          <RemixIcon name={icon} size={24} color={tw.color("primary")} />
        </View>

        <View style={tw.style(size == "sm" && "hidden")}>
          <Text style={tw`text-slate-500`}>{title}</Text>
          <Text variant="body" style={tw`text-primary`}>
            {subtitle}
          </Text>
        </View>

        <View style={tw.style(size == "lg" && "hidden")}>
          <Text variant="body" style={tw`text-primary`}>
            {title}
          </Text>
          <Text style={tw`text-slate-500`}>{subtitle}</Text>
        </View>
      </View>

      <RemixIcon
        style={tw.style(size === "sm" && "hidden")}
        name="ri-arrow-right-s-line"
        size={24}
        color={tw.color("primary")}
      />
    </TouchableOpacity>
  );
};

export default ActionCard;

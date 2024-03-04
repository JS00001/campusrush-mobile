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

import RemixIcon from "react-native-remix-icon";
import { TouchableOpacity, View } from "react-native";

import {
  ActionCardLgLoader,
  ActionCardMdLoader,
  ActionCardSmLoader,
} from "./Loaders";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { useAuth } from "@/providers/Auth";

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon?: string;
  pressable?: boolean;
  size?: keyof typeof sizeClasses;
  disabled?: boolean;
  style?: any;
  loading?: boolean;
  enforceProPlan?: boolean;
  onPress?: () => void;
}

const sizeClasses = {
  sm: {
    container: tw.style("p-3 flex-1"),
    childContainer: tw.style("flex-col gap-y-2.5"),
  },
  md: {
    container: tw.style("p-5 flex-1"),
    childContainer: tw.style("flex-col gap-y-2"),
  },
  lg: {
    container: tw.style(
      "px-6 py-5 w-full flex-row items-center justify-between",
    ),
    childContainer: tw.style("flex-row items-center gap-4 flex-1"),
  },
};

const loadingComponents = {
  sm: <ActionCardSmLoader />,
  md: <ActionCardMdLoader />,
  lg: <ActionCardLgLoader />,
};

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  subtitle,
  icon,
  size = "lg",
  pressable = true,
  onPress,
  style,
  disabled,
  enforceProPlan,
  loading,
}) => {
  const { isPro } = useAuth();

  const iconColor = enforceProPlan
    ? isPro
      ? tw.color("primary")
      : tw.color("yellow")
    : tw.color("primary");

  // Styling
  const containerClasses = tw.style(
    // Common classes
    "rounded-lg bg-slate-100 shadow-sm",
    // Disabled styling
    disabled && "opacity-50",
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

  if (loading) {
    return loadingComponents[size];
  }

  return (
    <TouchableOpacity
      style={containerClasses}
      onPress={onPress}
      disabled={!pressable || disabled || loading}
    >
      <View style={childContainerClasses}>
        {/* Left side icon */}
        {icon && (
          <View
            style={tw.style(
              size != "lg" && "p-2 rounded-sm bg-slate-200 self-start",
              size == "lg" && "items-center",
            )}
          >
            <RemixIcon name={icon} size={24} color={iconColor} />

            {enforceProPlan && !isPro && (
              <Text style={tw`text-yellow font-semibold text-[10px] leading-3`}>
                PRO
              </Text>
            )}
          </View>
        )}

        {/* Title and subtitle for size=lg */}
        <View style={tw.style(size != "lg" && "hidden", "shrink")}>
          <Text>{title}</Text>

          <Text style={tw`text-primary`}>{subtitle}</Text>
        </View>

        {/* Title and subtitle for size=sm and size=md */}
        <View style={tw.style(size == "lg" && "hidden", loading && "gap-2")}>
          <Text type={size == "md" ? "h1" : "p2"} style={tw`text-primary`}>
            {title}
          </Text>

          <Text type="p3">{subtitle}</Text>
        </View>
      </View>

      {/* Allow non-pressable buttons to still look proper */}
      <View />

      {/* Right side chevron */}
      {pressable && (
        <RemixIcon
          style={tw.style(size === "sm" && "hidden")}
          name="ri-arrow-right-s-line"
          size={24}
          color={tw.color("primary")}
        />
      )}
    </TouchableOpacity>
  );
};

export default ActionCard;

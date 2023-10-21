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

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Skeleton from "@/ui/Skeleton";

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon?: string;
  pressable?: boolean;
  size?: keyof typeof sizeClasses;
  onPress?: () => void;
  style?: any;
  loading?: boolean;
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

const ActionCard: React.FC<ActionCardProps> = ({
  title,
  subtitle,
  icon,
  size = "lg",
  pressable = true,
  onPress,
  style,
  loading,
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
    <TouchableOpacity
      style={containerClasses}
      onPress={onPress}
      disabled={!pressable}
    >
      <View style={childContainerClasses}>
        {/* Left side icon */}
        {icon && (
          <View
            style={tw.style(
              size != "lg" && "p-2 rounded-sm bg-slate-200 self-start",
            )}
          >
            <RemixIcon name={icon} size={24} color={tw.color("primary")} />
          </View>
        )}

        {/* Title and subtitle for size=lg */}
        <View style={tw.style(size != "lg" && "hidden", "shrink")}>
          {/* If size is lg AND component isnt loading, show content */}
          {!loading && <Text>{title}</Text>}
          {!loading && (
            <Text variant="body" style={tw`text-primary`}>
              {subtitle}
            </Text>
          )}

          {/* If size is lg AND component is loading, show skeletons */}
          {loading && <Skeleton width={100} height={15} style={tw`mb-2`} />}
          {loading && <Skeleton width={210} height={20} />}
        </View>

        {/* Title and subtitle for size=sm and size=md */}
        <View style={tw.style(size == "lg" && "hidden", loading && "gap-2")}>
          {/* If size is sm or md AND component isnt loading, show content */}
          {!loading && (
            <Text
              variant={size == "md" ? "header" : "body"}
              style={tw`text-primary`}
            >
              {title}
            </Text>
          )}
          {!loading && <Text>{subtitle}</Text>}

          {/* If size is sm or md AND component is loading, show skeletons */}
          {loading && <Skeleton width={"100%"} height={40} />}
          {loading && <Skeleton width={"100%"} height={30} />}
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

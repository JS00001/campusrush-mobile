/*
 * Created on Tue Aug 29 2023
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
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import Text from "@/ui/Text";
import Badge from "@/ui/Badge";
import tw from "@/lib/tailwind";
import Skeleton from "@/ui/Skeleton";

interface ListItemProps extends TouchableOpacityProps {
  title: string;
  subtitle: string;
  pressable?: boolean;
  badge?: string;
  loading?: boolean;
  style?: any;
  onPress?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  badge,
  onPress,
  style,
  loading,
  pressable = true,
  ...props
}) => {
  // Styling
  const containerClasses = tw.style(
    // Default classes
    "bg-slate-100 w-full py-3 px-5 rounded-md",
    // If pressable, add justify for chevron
    pressable && "flex-row justify-between items-center",
    // Custom classes
    style,
  );

  return (
    <TouchableOpacity
      {...props}
      disabled={!pressable}
      onPress={onPress}
      style={containerClasses}
    >
      {/* Title and subtitle */}
      <View>
        {/* If not loading, show content */}
        {!loading && (
          <Text variant="body" style={tw`text-primary`}>
            {title}
          </Text>
        )}
        {!loading && (
          <Text variant="subtext" style={tw`text-slate-500`}>
            {subtitle}
          </Text>
        )}

        {/* If loading, show skeleton */}
        {loading && <Skeleton height={15} width={150} style={tw`mb-2`} />}
        {loading && <Skeleton height={15} width={250} />}
      </View>

      {/* Chevron if pressable and Badge if passed */}
      <View style={tw`flex-row items-center gap-x-2`}>
        {badge && <Badge>{badge}</Badge>}
        {pressable && (
          <RemixIcon
            name="ri-arrow-right-s-line"
            size={20}
            color={tw.color("primary")}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

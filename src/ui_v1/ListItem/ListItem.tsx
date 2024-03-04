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

import { ListItemLoader } from "./Loading";

import Text from "@/ui_v1/Text";
import tw from "@/lib/tailwind";

interface ListItemProps extends TouchableOpacityProps {
  title: string;
  subtitle: string;
  pressable?: boolean;
  loading?: boolean;
  style?: any;
  icon?: string;
  iconColor?: string;
  onPress?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  onPress,
  style,
  loading,
  icon,
  iconColor = "black",
  pressable = true,
  ...props
}) => {
  // Styling
  const containerClasses = tw.style(
    // Default classes
    "bg-slate-100 w-full p-4 rounded-lg",
    // If pressable, add justify for chevron
    "flex-row justify-between items-center",
    // Custom classes
    style,
  );

  if (loading) return <ListItemLoader />;

  return (
    <TouchableOpacity
      {...props}
      disabled={!pressable}
      onPress={onPress}
      style={containerClasses}
    >
      {/* Title and subtitle */}
      <View style={tw`gap-3 items-center flex-row`}>
        {/* Icon, if passed, show icon, else fill space */}
        {icon ? (
          <RemixIcon name={icon} size={14} color={tw.color(iconColor)} />
        ) : (
          <View style={tw`w-3.5`} />
        )}

        <View style={tw`shrink`}>
          <Text variant="body" style={tw`text-primary`}>
            {title}
          </Text>

          <Text variant="subtext" style={tw`text-slate-500`}>
            {subtitle}
          </Text>
        </View>
      </View>

      {/* Chevron if pressable and Badge if passed */}
      {pressable && (
        <RemixIcon
          name="ri-arrow-right-s-line"
          size={20}
          color={tw.color("primary")}
        />
      )}
    </TouchableOpacity>
  );
};

export default ListItem;

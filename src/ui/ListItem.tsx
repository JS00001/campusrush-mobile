/*
 * Created on Wed Mar 06 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Icon, { IconType } from "@/ui/Icon";

export type ListItemSize = "sm" | "md" | "lg";

interface ListItemProps extends TouchableOpacityProps {
  title: string;
  subtitle: string;
  icon?: IconType;
  iconColor?: string;
  pressable?: boolean;
  size?: ListItemSize;
  style?: any;
  titleStyle?: any;
  subtitleStyle?: any;
}

/**
 * The size of the icon in the ListItem
 */
const ListItemIconSizes = {
  sm: 24,
  md: 14,
  lg: 24,
};

const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  icon,
  iconColor,
  size = "md",
  disabled,
  pressable = true,
  style,
  titleStyle,
  subtitleStyle,
  ...props
}) => {
  const label = props["ph-label"] || `list_item_"${title}"`;
  const iconNameValue = icon || "circle-line";
  const iconSizeValue = ListItemIconSizes[size];
  const iconColorValue = iconColor || tw.color("primary");

  const subtitleMaxLines = size != "md" ? 3 : 1;

  const containerStyles = tw.style(
    "bg-slate-100 rounded-xl gap-4",
    disabled && "disabled",
    size === "sm" && "p-4 gap-y-2 flex-col flex-1",
    size === "md" && "px-3 py-4 justify-between items-center flex-row w-full",
    size === "lg" && "px-7 py-4 justify-between items-center flex-row w-full",
    style,
  );

  const contentContainerStyles = tw.style(
    "shrink",
    size === "sm" && "flex-col gap-y-2",
    size === "md" && "flex-row gap-x-2 items-center",
    size === "lg" && "flex-row gap-x-5 items-center",
  );

  const iconStyles = tw.style(
    !icon && "opacity-0",
    size === "sm" && "rounded-lg p-2 bg-slate-200 self-start",
  );

  return (
    <TouchableOpacity
      ph-label={label}
      style={containerStyles}
      disabled={disabled || !pressable}
      {...props}
    >
      <View style={contentContainerStyles}>
        <View style={iconStyles}>
          <Icon
            name={iconNameValue}
            size={iconSizeValue}
            color={iconColorValue}
          />
        </View>

        <View style={tw`shrink`}>
          <Text type="p2" style={tw.style("text-primary", titleStyle)}>
            {title}
          </Text>
          <Text
            type="p3"
            numberOfLines={subtitleMaxLines}
            style={subtitleStyle}
          >
            {subtitle}
          </Text>
        </View>
      </View>

      {/* Caret only for medium and large */}
      {size !== "sm" && pressable && (
        <Icon name="arrow-right-s-line" size={24} color={tw.color("primary")} />
      )}
    </TouchableOpacity>
  );
};

export default ListItem;

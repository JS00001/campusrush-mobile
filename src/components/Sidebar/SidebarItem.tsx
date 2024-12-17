/*
 * Created on Wed Sep 04 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { ActivityIndicator, TouchableHighlight, View } from "react-native";

import type { IconType } from "@/constants/icons";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import Badge from "@/ui/Badge";
import tw from "@/lib/tailwind";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  badgeCount?: number;
  loading?: boolean;
  selected?: boolean;
  newFeature?: boolean;
  onPress: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  badgeCount,
  loading,
  selected,
  newFeature,
  onPress,
}) => {
  const containerStyles = tw.style(
    "flex-row items-center gap-3",
    "px-8 py-3",
    selected && "bg-white",
  );

  const textStyles = tw.style("text-gray-600 font-medium");

  const ItemIcon = () => {
    if (loading) {
      return <ActivityIndicator size={20} color={tw.color("gray-800")} />;
    }

    return (
      <Icon
        size={18}
        icon={icon}
        color={tw.color("gray-600")}
        weight="duotone"
      />
    );
  };

  return (
    <TouchableHighlight underlayColor={tw.color("gray-200")} onPress={onPress}>
      <View>
        {selected && <View style={tw`w-1 h-full bg-blue-600 absolute z-10`} />}

        <View style={containerStyles}>
          <ItemIcon />

          <Text type="p2" style={textStyles}>
            {label}
          </Text>

          <View style={tw`flex-row gap-1`}>
            {!!badgeCount && (
              <Badge size="xs" style={tw`self-center px-1.5 bg-blue-600`}>
                {badgeCount}
              </Badge>
            )}

            {newFeature && (
              <Badge size="xs" style={tw`self-center bg-blue-600`}>
                New
              </Badge>
            )}
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default SidebarItem;

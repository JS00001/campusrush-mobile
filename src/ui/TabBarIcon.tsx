/*
 * Created on Fri Apr 05 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Icon, { IconType } from "@/ui/Icon";

interface TabBarIconProps {
  focused: boolean;
  color: string;
  focusedIcon: IconType;
  unfocusedIcon: IconType;
  badgeCount?: number;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
  focused,
  color,
  focusedIcon,
  unfocusedIcon,
  badgeCount = 0,
}) => {
  const icon = focused ? focusedIcon : unfocusedIcon;

  const badgeContainerStyles = tw.style(
    "absolute -top-1 -right-2",
    "bg-white rounded-full p-0.5",
  );

  const badgeStyles = tw.style(
    "w-4, h-4",
    "bg-blue-600 rounded-full items-center justify-center",
  );

  const badgeTextStyles = tw.style("text-white leading-0 text-[10px]");

  return (
    <View>
      <Icon name={icon} size={26} color={color} />

      {badgeCount > 0 && (
        <View style={badgeContainerStyles}>
          <View style={badgeStyles}>
            <Text style={badgeTextStyles}>{badgeCount}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default TabBarIcon;

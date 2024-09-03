/*
 * Created on Tue Sep 03 2024
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

import type { ActionMenuSection } from "@/types";

import MenuItem from "./MenuItem";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface MenuSectionProps {
  section: ActionMenuSection;
  separator?: boolean;
  onPress: () => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({
  separator,
  section,
  onPress,
}) => {
  const containerStyles = tw.style(
    "gap-y-3",
    separator && "border-b border-slate-200 pb-4",
  );

  return (
    <View style={containerStyles}>
      {section.header && (
        <Text type="h3" style={tw`px-6`}>
          {section.header}
        </Text>
      )}

      <View>
        {section.menuItems.map((item, index) => {
          const onItemPress = () => {
            onPress();
            item.onPress();
          };

          return (
            <MenuItem
              key={index}
              iconName={item.iconName}
              label={item.label}
              onPress={onItemPress}
            />
          );
        })}
      </View>
    </View>
  );
};

export default MenuSection;

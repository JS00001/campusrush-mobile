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

import { TouchableHighlight, View } from "react-native";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

import { ActionMenuItem } from "@/types";

const MenuItem: React.FC<ActionMenuItem> = ({ iconName, label, onPress }) => {
  const containerStyles = tw.style("flex-row gap-4 items-center px-6", "py-3");

  return (
    <TouchableHighlight underlayColor={tw.color("gray-200")} onPress={onPress}>
      <View style={containerStyles}>
        <Icon icon={iconName} size={20} />
        <Text type="p1" style={tw`text-primary`}>
          {label}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default MenuItem;

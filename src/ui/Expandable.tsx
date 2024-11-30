/*
 * Created on Wed Jul 10 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useState } from "react";
import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";

interface ExpandableProps extends TouchableOpacityProps {
  title: string;
  style?: any;
}

const Expandable: React.FC<ExpandableProps> = ({
  title,
  style,
  children,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const iconName = expanded ? "CaretUp" : "CaretDown";

  const containerStyles = tw.style("rounded-xl bg-gray-100 p-4 gap-4", style);

  const titleContainerStyles = tw.style(
    "w-full flex-row justify-between items-center",
  );

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={toggleExpanded}
      {...props}
    >
      <View style={titleContainerStyles}>
        <Text type="h4">{title}</Text>
        <Icon icon={iconName} color={tw.color("primary")} />
      </View>

      {expanded && children}
    </TouchableOpacity>
  );
};

export default Expandable;

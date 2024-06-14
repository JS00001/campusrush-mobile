/*
 * Created on Thu Jun 13 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View, ViewProps } from "react-native";

import tw from "@/lib/tailwind";

interface ActionListProps extends ViewProps {
  style?: any;
}

const ActionList: React.FC<ActionListProps> = ({
  children,
  style,
  ...props
}) => {
  const containerStyles = tw.style("w-full rounded-xl overflow-hidden", style);

  return (
    <View style={containerStyles} {...props}>
      {children}
    </View>
  );
};

export default ActionList;

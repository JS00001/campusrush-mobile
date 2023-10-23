/*
 * Created on Tue Oct 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import React from "react";
import { View } from "react-native";

import tw from "@/lib/tailwind";

interface ButtonGroupProps {
  children: React.ReactNode;
  style?: any;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, style }) => {
  // Modify all the children to have "style={tw.style('flex-1')}"
  // so that they take up equal space
  children = React.Children.map(children, (child) => {
    return React.cloneElement(child as any, {
      style: tw.style("flex-1", (child as any).props.style),
    });
  });

  // Styling
  const containerClasses = tw.style(
    "flex flex-row items-center gap-x-2",
    style,
  );

  return <View style={containerClasses}>{children}</View>;
};

export default ButtonGroup;

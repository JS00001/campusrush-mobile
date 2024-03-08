/*
 * Created on Fri Mar 08 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import React from "react";
import { View, ViewProps } from "react-native";

import tw from "@/lib/tailwind";

interface ButtonGroupProps extends ViewProps {
  children: React.ReactNode;
  style?: any;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  style,
  ...props
}) => {
  /**
   * Modify all children (buttons) to have a 'flex-1' style so that
   * they take up equal space in the button group
   */
  children = React.Children.map(children, (child) => {
    if (!child) return;

    return React.cloneElement(child as any, {
      style: tw.style("flex-1", (child as any)?.props?.style),
    });
  });

  const containerStyles = tw.style("flex flex-row items-center gap-x-2", style);

  return (
    <View style={containerStyles} {...props}>
      {children}
    </View>
  );
};

export default ButtonGroup;

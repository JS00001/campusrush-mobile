/*
 * Created on Mon Dec 09 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import React, { forwardRef } from "react";
import { View, ViewProps } from "react-native";

import tw from "@/lib/tailwind";

interface LayoutProps extends ViewProps {
  style?: any;
}

const Layout = forwardRef<View, LayoutProps>(
  ({ children, style, ...props }, ref) => {
    const containerStyles = tw.style("flex-1 z-10", style);

    return (
      <View style={containerStyles} ref={ref} {...props}>
        {children}
      </View>
    );
  },
);

export default Layout;

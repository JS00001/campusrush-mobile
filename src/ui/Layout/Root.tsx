/*
 * Created on Fri Mar 15 2024
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

interface LayoutProps extends ViewProps {
  style?: any;
}

const Layout: React.FC<LayoutProps> = ({ children, style, ...props }) => {
  const containerStyles = tw.style("flex-1 z-10", style);

  return (
    <View style={containerStyles} {...props}>
      {children}
    </View>
  );
};

export default Layout;

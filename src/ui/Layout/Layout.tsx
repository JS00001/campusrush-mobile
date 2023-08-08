/*
 * Created on Tue Aug 08 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */
import { View, ViewProps } from "react-native";

import tw from "@/lib/tailwind";

interface LayoutProps extends ViewProps {
  flexGap?: string;
  centerChildren?: boolean;
  style?: any;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  style,
  children,
  centerChildren,
  flexGap = "24px",
}) => {
  const containerClasses = tw.style(
    "w-full items-center px-6",
    flexGap && { gap: flexGap },
    centerChildren && "items-center",
    style,
  );

  return <View style={containerClasses}>{children}</View>;
};

export default Layout;

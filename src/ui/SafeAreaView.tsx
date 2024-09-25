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

import { useLayoutEffect, useState } from "react";
import { View, Dimensions, ViewProps } from "react-native";
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";

import tw from "@/lib/tailwind";

interface SafeAreaViewProps extends ViewProps {
  style?: any;
  /** Which area to apply padding to */
  position?: "top" | "bottom" | "left" | "right";
}

const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  position,
  style,
  ...props
}) => {
  const [insets, setInsets] = useState({
    bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    right: StaticSafeAreaInsets.safeAreaInsetsRight,
    top: StaticSafeAreaInsets.safeAreaInsetsTop,
    left: StaticSafeAreaInsets.safeAreaInsetsLeft,
  });

  useLayoutEffect(() => {
    const subscription = Dimensions.addEventListener("change", () => {
      StaticSafeAreaInsets.getSafeAreaInsets((values) => {
        setInsets({
          bottom: values.safeAreaInsetsBottom,
          right: values.safeAreaInsetsRight,
          top: values.safeAreaInsetsTop,
          left: values.safeAreaInsetsLeft,
        });
      });
    });

    return () => subscription.remove();
  });

  const containerStyles = tw.style(
    {
      paddingTop: position === "top" ? insets.top : 0,
      paddingBottom: position === "bottom" ? insets.bottom : 0,
      paddingLeft: position === "left" ? insets.left : 0,
      paddingRight: position === "right" ? insets.right : 0,
    },
    style,
  );

  return (
    <View {...props} style={containerStyles}>
      {children}
    </View>
  );
};

export default SafeAreaView;

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

import { useEffect, useState } from "react";
import { View, Dimensions, ViewProps } from "react-native";
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";

interface SafeAreaViewProps extends ViewProps {
  style?: any;
  position?: "top" | "bottom" | "left" | "right";
}

const SafeAreaView: React.FC<SafeAreaViewProps> = ({
  children,
  position = "top",
  style,
  ...props
}) => {
  const [insets, setInsets] = useState({
    bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    right: StaticSafeAreaInsets.safeAreaInsetsRight,
    top: StaticSafeAreaInsets.safeAreaInsetsTop,
    left: StaticSafeAreaInsets.safeAreaInsetsLeft,
  });

  useEffect(() => {
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

  return (
    <View
      {...props}
      style={{
        paddingTop: position === "top" ? insets.top : 0,
        paddingBottom: position === "bottom" ? insets.bottom : 0,
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export default SafeAreaView;

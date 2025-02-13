/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { NavigationContainer } from "@react-navigation/native";

import { navigationTheme } from "@/lib/theme";

const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <NavigationContainer theme={navigationTheme}>
      {children}
    </NavigationContainer>
  );
};

export default NavigationProvider;

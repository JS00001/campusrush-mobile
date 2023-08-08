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

import { registerRootComponent } from "expo";

import RootNavigator from "@/navigation/root-navigator";
import NavigationProvider from "@/providers/NavigationProvider";

const App = () => {
  return (
    <NavigationProvider>
      <RootNavigator />
    </NavigationProvider>
  );
};

registerRootComponent(App);

export default App;

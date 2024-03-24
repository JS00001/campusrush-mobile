/*
 * Created on Sun Sep 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { Layout } from "@/ui/Layout";
import ListItemLoader from "@/ui/Loaders/ListItem";
import Switch from "@/ui/Switch";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";

interface UITestingScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITestingScreen: React.FC<UITestingScreenProps> = ({ navigation }) => {
  const [value, setValue] = useState(false);

  return (
    <Layout.Root>
      <Layout.Content>
        <ListItemLoader size="sm" />
        <ListItemLoader size="md" />
        <ListItemLoader size="lg" />

        <Switch value={value} onValueChange={setValue} />
      </Layout.Content>
    </Layout.Root>
  );
};

export default UITestingScreen;

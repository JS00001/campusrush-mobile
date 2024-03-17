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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface UITestingScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const UITestingScreen: React.FC<UITestingScreenProps> = ({ navigation }) => {
  return (
    <Layout.Root>
      <Layout.Content>
        <ListItemLoader size="sm" />
        <ListItemLoader size="md" />
        <ListItemLoader size="lg" />
      </Layout.Content>
    </Layout.Root>
  );
};

export default UITestingScreen;

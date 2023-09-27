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

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Layout from "@/ui/Layout";

interface StatisticsProps {
  navigation: NativeStackNavigationProp<any>;
}

const Statistics: React.FC<StatisticsProps> = ({ navigation }) => {
  return (
    <Layout scrollable gap={12}>
      <Layout.Header
        hasBackButton
        title="Statistics"
        subtitle="Statistics for the app"
      />
    </Layout>
  );
};

export default Statistics;

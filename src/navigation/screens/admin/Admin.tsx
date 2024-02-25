/*
 * Created on Fri Sep 15 2023
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
import ActionCard from "@/ui/ActionCard";

interface AdminProps {
  navigation: NativeStackNavigationProp<any>;
}

const Admin: React.FC<AdminProps> = ({ navigation }) => {
  const onChaptersPress = () => {
    navigation.navigate("AdminChapters");
  };

  const onUITestingPress = () => {
    navigation.navigate("AdminUITesting");
  };

  const onNetworkPress = () => {
    navigation.navigate("AdminNetwork");
  };

  return (
    <Layout scrollable gap={12}>
      <Layout.Header title="Admin" subtitle="Admin options/developer options" />

      <ActionCard
        title="View Chapters"
        subtitle="List all registered chapters"
        icon="ri-group-fill"
        onPress={onChaptersPress}
      />

      <ActionCard
        title="UI Testing"
        subtitle="Test new UI in a sandbox environment"
        icon="ri-layout-masonry-fill"
        onPress={onUITestingPress}
      />

      <ActionCard
        title="Network"
        subtitle="View network logs"
        icon="ri-wifi-fill"
        onPress={onNetworkPress}
      />
    </Layout>
  );
};

export default Admin;

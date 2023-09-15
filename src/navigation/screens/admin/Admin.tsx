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
  return (
    <Layout scrollable gap={12}>
      <Layout.Header title="Admin" subtitle="Admin options/developer options" />

      <ActionCard
        title="Statistics"
        subtitle="View statistics for the app"
        icon="ri-bar-chart-2-fill"
      />

      <ActionCard
        title="View Organizations"
        subtitle="List all registered organizations"
        icon="ri-group-fill"
      />

      <ActionCard
        title="Update Organization Billing"
        subtitle="Update an organization's billing"
        icon="ri-bank-card-2-fill"
      />
    </Layout>
  );
};

export default Admin;

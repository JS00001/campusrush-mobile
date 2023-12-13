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
import useAdmin from "@/hooks/useAdmin";
import AdminOrganizationList from "@/components/AdminOrganizationList";

interface OrganizationsProps {
  navigation: NativeStackNavigationProp<any>;
}

const Organizations: React.FC<OrganizationsProps> = ({ navigation }) => {
  const { organizations, refetchOrganizations, getOrganizationsQuery } =
    useAdmin();

  const onRefresh = async () => {
    await refetchOrganizations();
  };

  return (
    <Layout gap={12}>
      <Layout.Header
        hasBackButton
        title="Organizations"
        subtitle="View all registered organizations"
      />

      <AdminOrganizationList
        loading={getOrganizationsQuery.isLoading}
        organizations={organizations}
        refetchOrganizations={onRefresh}
      />
    </Layout>
  );
};

export default Organizations;

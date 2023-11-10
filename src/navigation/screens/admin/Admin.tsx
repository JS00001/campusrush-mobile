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

import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import ActionCard from "@/ui/ActionCard";
import useAdmin from "@/hooks/useAdmin";
import Information from "@/ui/Information";

interface AdminProps {
  navigation: NativeStackNavigationProp<any>;
}

const Admin: React.FC<AdminProps> = ({ navigation }) => {
  const {
    clearSubscription,
    forceProSubscription,
    forceBasicSubscription,
    upgradeOrganizationMutation,
    downgradeOrganizationMutation,
  } = useAdmin();

  const onStatisticsPress = () => {
    navigation.navigate("AdminStatistics");
  };

  const onOrganizationsPress = () => {
    navigation.navigate("AdminOrganizations");
  };

  const onBillingPress = () => {
    navigation.navigate("AdminBilling");
  };

  const onUITestingPress = () => {
    navigation.navigate("AdminUITesting");
  };

  const onForceBasicPress = () => {
    forceBasicSubscription();
  };

  const onForceProPress = () => {
    forceProSubscription();
  };

  const onClearSubscriptionPress = () => {
    clearSubscription();
  };

  return (
    <Layout scrollable gap={12}>
      <Layout.Header title="Admin" subtitle="Admin options/developer options" />

      <ActionCard
        title="Statistics"
        subtitle="View statistics for the app"
        icon="ri-bar-chart-2-fill"
        onPress={onStatisticsPress}
      />

      <ActionCard
        title="View Organizations"
        subtitle="List all registered organizations"
        icon="ri-group-fill"
        onPress={onOrganizationsPress}
      />

      <ActionCard
        title="Update Organization Billing"
        subtitle="Update an organization's billing"
        icon="ri-bank-card-2-fill"
        onPress={onBillingPress}
      />

      <ActionCard
        title="UI Testing"
        subtitle="Test new UI in a sandbox environment"
        icon="ri-layout-masonry-fill"
        onPress={onUITestingPress}
      />

      <Button
        size="sm"
        style={tw`w-full`}
        onPress={onForceBasicPress}
        loading={upgradeOrganizationMutation.isLoading}
      >
        Force Basic Subscription
      </Button>
      <Button
        size="sm"
        style={tw`w-full`}
        onPress={onForceProPress}
        loading={upgradeOrganizationMutation.isLoading}
      >
        Force Pro Subscription
      </Button>
      <Button
        size="sm"
        style={tw`w-full`}
        onPress={onClearSubscriptionPress}
        loading={downgradeOrganizationMutation.isLoading}
      >
        Clear Current Subscription
      </Button>
    </Layout>
  );
};

export default Admin;

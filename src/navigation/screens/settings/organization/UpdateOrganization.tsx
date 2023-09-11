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

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Layout from "@/ui/Layout";
import ActionCard from "@/ui/ActionCard";
import TextInput from "@/ui/TextInput";
import { useAuth } from "@/providers/Auth";

interface UpdateOrganizationProps {
  navigation: NativeStackNavigationProp<any>;
}

const UpdateOrganization: React.FC<UpdateOrganizationProps> = ({
  navigation,
}) => {
  const { organization } = useAuth();

  const onGeneralPress = () => {
    navigation.navigate("UpdateGeneral");
  };

  const onSecurityPress = () => {
    navigation.navigate("UpdateSecurity");
  };

  return (
    <Layout scrollable>
      <Layout.Header
        hasBackButton
        title="Organization"
        subtitle="Manage your organization"
      />

      <TextInput
        disabled
        placeholder="Organization Name"
        value={organization.name || "N/A"}
      />
      <TextInput
        disabled
        placeholder="School"
        value={organization.school || "N/A"}
      />

      <ActionCard
        title="General"
        subtitle="Update general information"
        icon="ri-building-2-fill"
        onPress={onGeneralPress}
      />

      <ActionCard
        title="Security"
        subtitle="Update security information"
        icon="ri-shield-check-fill"
        onPress={onSecurityPress}
      />
    </Layout>
  );
};

export default UpdateOrganization;

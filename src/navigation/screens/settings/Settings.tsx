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

import tw from "@/lib/tailwind";
import ActionCard from "@/ui/ActionCard";
import Button from "@/ui/Button";
import Layout from "@/ui/Layout";
import { View } from "react-native";

const Settings = () => {
  return (
    <Layout scrollable>
      <Layout.Header title="Settings" subtitle="Manage your organization" />

      <ActionCard
        title="Organization"
        subtitle="Manage your organization"
        icon="ri-building-2-fill"
        onPress={() => {}}
      />

      <ActionCard
        title="Billing"
        subtitle="Manage your billing"
        icon="ri-bank-card-2-fill"
        onPress={() => {}}
      />

      <ActionCard
        title="Notifications"
        subtitle="Manage your notifications"
        icon="ri-notification-2-fill"
        onPress={() => {}}
      />

      <View style={tw`w-full flex-row gap-5`}>
        <ActionCard
          title="Help"
          subtitle="Contact our support team now"
          icon="ri-questionnaire-fill"
          onPress={() => {}}
          size="sm"
        />

        <ActionCard
          title="About"
          subtitle="View identifying app information"
          icon="ri-information-fill"
          onPress={() => {}}
          size="sm"
        />
      </View>
    </Layout>
  );
};

export default Settings;

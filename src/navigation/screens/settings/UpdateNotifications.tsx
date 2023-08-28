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

import Layout from "@/ui/Layout";
import SelectionCard from "@/ui/SelectionCard/SelectionCard";

const UpdateNotifications = () => {
  return (
    <Layout scrollable>
      <Layout.Header
        hasBackButton
        title="Notifications"
        subtitle="Manage your notifications"
      />

      <SelectionCard
        selected
        title="Enable Notifications"
        description="You will receive push notifications for various events to better help your organization succeed."
        subtitle="Currently Selected"
        onPress={() => {}}
      />
      <SelectionCard
        title="Disable Notifications"
        description="You will not receive push notifications. You can turn notifications back on at any time."
        subtitle="Click to disable notifications"
        onPress={() => {}}
      />
    </Layout>
  );
};

export default UpdateNotifications;

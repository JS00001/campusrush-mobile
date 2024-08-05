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

import { Layout } from "@/ui/Layout";
import UpdateNotificationsView from "@/views/settings/UpdateNotifications";

const UpdateNotificationsScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Notifications"
        subtitle="Manage your notifications"
      />

      <Layout.Content>
        <UpdateNotificationsView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default UpdateNotificationsScreen;

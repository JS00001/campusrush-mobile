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
import SettingsView from "@/views/settings";

const SettingsScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header title="Settings" subtitle="Manage your chapter" />

      <Layout.Content scrollable gap={12}>
        <SettingsView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default SettingsScreen;

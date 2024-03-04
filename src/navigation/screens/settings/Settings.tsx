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
import Layout from "@/ui_v1/Layout";
import SettingsView from "@/views/settings";

const SettingsScreen = () => {
  return (
    <Layout scrollable gap={12} contentContainerStyle={tw`pb-6`}>
      <Layout.Header
        hasBackButton
        title="Settings"
        subtitle="Manage your chapter"
      />

      <SettingsView />
    </Layout>
  );
};

export default SettingsScreen;

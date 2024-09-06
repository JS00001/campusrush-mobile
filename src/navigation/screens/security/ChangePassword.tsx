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
import ChangePasswordView from "@/views/settings/ChangePassword";

const ChangePasswordScreen: React.FC = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Change Password"
        subtitle="Update your security information"
      />

      <Layout.Content gap={12} scrollable>
        <ChangePasswordView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default ChangePasswordScreen;

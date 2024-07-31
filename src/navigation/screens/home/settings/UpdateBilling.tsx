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
import UpdateBillingView from "@/views/settings/UpdateBilling";

const UpdateBillingScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header
        hasBackButton
        title="Billing"
        subtitle="Manage your current plan"
      />

      <Layout.Content scrollable>
        <UpdateBillingView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default UpdateBillingScreen;

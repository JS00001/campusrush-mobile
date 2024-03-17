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
import BillingView from "@/views/Billing";

const BillingScreen = () => {
  return (
    <Layout.Root>
      <Layout.Header title="Billing" subtitle="Select a plan to get started" />

      <Layout.Content scrollable gap={18}>
        <BillingView />
      </Layout.Content>
    </Layout.Root>
  );
};

export default BillingScreen;

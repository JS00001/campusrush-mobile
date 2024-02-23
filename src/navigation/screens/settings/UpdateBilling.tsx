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

import { Linking } from "react-native";

import Button from "@/ui/Button";
import Layout from "@/ui/Layout";
import useBilling from "@/hooksv1/useBilling";
import BillingDetails from "@/components/BillingDetails";
import Hyperlink from "@/ui/Hyperlink";

const UpdateBilling = () => {
  const { activeProducts, managementURL, restorePurchases } = useBilling();

  // Open the URL to manage billing (typically the app store)
  const onManageBilling = () => {
    if (managementURL) {
      Linking.openURL(managementURL);
    }
  };

  return (
    <Layout scrollable>
      <Layout.Header
        hasBackButton
        title="Billing"
        subtitle="Manage your current plan"
      />
      {/* All plans/perks that the user has purchased/subscribed to */}
      <BillingDetails activeProducts={activeProducts || []} />

      {/* Button to manage billing */}
      <Button onPress={onManageBilling}>Manage Subscription</Button>

      {/* Button to restore purchases */}
      <Hyperlink onPress={restorePurchases}>Restore Purchases</Hyperlink>
    </Layout>
  );
};

export default UpdateBilling;

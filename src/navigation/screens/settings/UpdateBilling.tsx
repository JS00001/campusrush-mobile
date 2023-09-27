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

import useBilling from "@/hooks/useBilling";
import Button from "@/ui/Button";
import Layout from "@/ui/Layout";
import SelectionCard from "@/ui/SelectionCard/SelectionCard";

const UpdateBilling = () => {
  const { activeProducts, managementURL } = useBilling();
  return (
    <Layout scrollable>
      <Layout.Header
        hasBackButton
        title="Billing"
        subtitle="Manage your current plan"
      />

      {activeProducts.map((product) => (
        <SelectionCard
          pressable={false}
          title={product.title}
          subtitle={product.subtitle}
          description={product.description}
        >
          <Button color="light" size="sm">
            Manage
          </Button>
        </SelectionCard>
      ))}
    </Layout>
  );
};

export default UpdateBilling;

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
import Button from "@/ui/Button";

import useBilling from "@/hooks/useBilling";
import SegmentedControl from "@/ui/SegmentedControl";
import ProductCard from "@/components/ProductCard";

const Billing = () => {
  const {
    isLoading,
    product,
    buttonCTA,
    packages,
    offeringIDs,
    offeringID,
    packageID,
    setOfferingID,
    setPackageID,
  } = useBilling();

  const onSegmentedControlChange = (event: any) => {
    setOfferingID(event.nativeEvent.selectedSegmentIndex);
  };

  if (isLoading) return null;

  return (
    <Layout scrollable gap={18} hasTermsAndConditions>
      <Layout.Header title="Billing" subtitle="Select a plan to get started" />
      <SegmentedControl
        values={offeringIDs}
        selectedIndex={offeringID}
        onChange={onSegmentedControlChange}
      />

      {packages.map(({ product }, i) => (
        <ProductCard
          key={i}
          product={product}
          selected={i === packageID}
          onPress={() => setPackageID(i)}
        />
      ))}

      <Button>{buttonCTA}</Button>
    </Layout>
  );
};

export default Billing;

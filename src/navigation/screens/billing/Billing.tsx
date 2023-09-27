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

import usePurchase from "@/hooks/usePurchase";
import ProductCard from "@/components/ProductCard";
import SegmentedControl from "@/ui/SegmentedControl";

const Billing = () => {
  const {
    areOfferingsLoading,
    isPurchaseLoading,
    buttonCTA,
    packages,
    offeringIDs,
    offeringID,
    packageID,
    setOfferingID,
    setPackageID,
    completePurchase,
  } = usePurchase();

  const onSegmentedControlChange = (event: any) => {
    setOfferingID(event.nativeEvent.selectedSegmentIndex);
  };

  const onButtonPress = () => {
    completePurchase();
  };

  if (areOfferingsLoading) return null;

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

      <Button loading={isPurchaseLoading} onPress={onButtonPress}>
        {buttonCTA}
      </Button>
    </Layout>
  );
};

export default Billing;

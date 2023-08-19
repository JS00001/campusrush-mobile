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
import SelectionCard from "@/ui/SelectionCard/SelectionCard";
import Text from "@/ui/Text";

const Billing = () => {
  const {
    isLoading,
    currentTab,
    setCurrentTab,
    offeringIDs,
    packages,
    setSelectedPackage,
    selectedPackage,
  } = useBilling();

  const onSegmentedControlChange = (event: any) => {
    setCurrentTab(event.nativeEvent.selectedSegmentIndex);
  };

  const buttonCTA = packages[selectedPackage]?.product.introPrice
    ? `Start your ${packages[selectedPackage]?.product.introPrice
        ?.periodNumberOfUnits}-${packages[
        selectedPackage
      ]?.product.introPrice?.periodUnit.toLowerCase()} free trial\nthen ${packages[
        selectedPackage
      ]?.product.priceString} / mo`
    : `Purchase for ${packages[selectedPackage]?.product.priceString}`;

  if (isLoading) return null;

  return (
    <Layout scrollable gap={18} hasTermsAndConditions>
      <Layout.Header title="Billing" subtitle="Select a plan to get started" />
      <SegmentedControl
        values={offeringIDs}
        selectedIndex={currentTab}
        onChange={onSegmentedControlChange}
      />

      {packages.map(({ product }, i) => (
        <SelectionCard
          key={i}
          hideChildrenWhenUnselected
          title={product.title}
          subtitle={product.priceString + " / mo"}
          description={
            product.introPrice
              ? `with ${
                  product.introPrice.periodNumberOfUnits
                }-${product.introPrice.periodUnit.toLowerCase()} free trial`
              : "one-time purchase"
          }
          selected={selectedPackage === i}
          onPress={() => setSelectedPackage(i)}
        ></SelectionCard>
      ))}

      <Button>{buttonCTA}</Button>
    </Layout>
  );
};

export default Billing;

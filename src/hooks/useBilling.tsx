/*
 * Created on Sat Aug 19 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useState } from "react";

import { useAuth } from "@/providers/Auth";
import { usePurchases } from "@/providers/Purchases";

const useBilling = () => {
  // Import refetch billing data from auth provider
  const { refetchBillingData } = useAuth();

  // Import data from the Purchases provider
  const { offeringIDs, offerings, isLoading, purchasePackage } = usePurchases();

  // Index of the currently selected offering
  const [offeringID, setOfferingID] = useState<number>(0);
  // Index of the currently selected package
  const [packageID, setPackageID] = useState<number>(0);

  // List of all packages in the currently selected offering
  const packages = offerings?.[offeringID]?.availablePackages;
  // Currently selected package
  const selectedPackage = packages?.[packageID];
  // Currently selected product
  const selectedProduct = packages?.[packageID]?.product;

  // **PRIVATE VAR** Whether or not a product is a subscription
  const _isSubscription = selectedProduct?.productCategory === "SUBSCRIPTION";
  // **PRIVATE VAR** Whether or not a product has a trial period (free trial)
  const _hasTrialPeriod = selectedProduct?.introPrice !== null;
  // **PRIVATE VAR** The length of a trial period (formatted as "3-day" or "1-week" etc.)
  // prettier-ignore
  const _trialLength = `${selectedProduct?.introPrice?.periodNumberOfUnits}-${selectedProduct?.introPrice?.periodUnit.toLowerCase()}`;

  // CTA for the button (confirming a user's purchase)
  const buttonCTA = _isSubscription
    ? _hasTrialPeriod
      ? `Start your ${_trialLength} free trial\nthen ${selectedProduct?.priceString} / mo`
      : `Purchase for ${selectedProduct?.priceString} / mo`
    : `Purchase for ${selectedProduct?.priceString}`;

  const completePurchase = async () => {
    const purchase = await purchasePackage(selectedPackage);

    refetchBillingData();
  };

  return {
    isLoading,
    buttonCTA,
    selectedProduct,
    selectedPackage,
    offeringIDs,
    packages,
    packageID,
    setPackageID,
    offeringID,
    setOfferingID,
    completePurchase,
  };
};

export default useBilling;

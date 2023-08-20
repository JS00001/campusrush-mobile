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

import { usePurchases } from "@/providers/Purchases";

const useBilling = () => {
  // Import data from the Purchases provider
  const { offeringIDs, offerings, isLoading } = usePurchases();

  // Index of the currently selected offering
  const [offeringID, setOfferingID] = useState<number>(0);
  // Index of the currently selected package
  const [packageID, setPackageID] = useState<number>(0);

  // List of all packages in the currently selected offering
  const packages = offerings[offeringID]?.availablePackages;
  // Currently selected product
  const product = packages[packageID]?.product;

  // **PRIVATE VAR** Whether or not a product is a subscription
  const _isSubscription = product.productCategory === "SUBSCRIPTION";
  // **PRIVATE VAR** Whether or not a product has a trial period (free trial)
  const _hasTrialPeriod = product.introPrice !== null;
  // **PRIVATE VAR** The length of a trial period (formatted as "3-day" or "1-week" etc.)
  // prettier-ignore
  const _trialLength = `${product.introPrice?.periodNumberOfUnits}-${product.introPrice?.periodUnit.toLowerCase()}`;

  // CTA for the button (confirming a user's purchase)
  const buttonCTA = _isSubscription
    ? _hasTrialPeriod
      ? `Start your ${_trialLength} free trial\nthen ${product.priceString} / mo`
      : `Purchase for ${product.priceString} / mo`
    : `Purchase for ${product.priceString}`;

  return {
    isLoading,
    buttonCTA,
    product,
    offeringIDs,
    packages,
    packageID,
    setPackageID,
    offeringID,
    setOfferingID,
  };
};

export default useBilling;

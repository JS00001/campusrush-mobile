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
  const { offeringIDs, offerings, isLoading } = usePurchases();
  // The current tab for the segment control
  const [currentTab, setCurrentTab] = useState<number>(0);

  const packages = offerings[currentTab]?.availablePackages;

  const [selectedPackage, setSelectedPackage] = useState<number>(0);

  return {
    isLoading,
    offeringIDs,
    offerings,
    packages,
    selectedPackage,
    setSelectedPackage,
    currentTab,
    setCurrentTab,
  };
};

export default useBilling;

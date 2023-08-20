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

import Purchases, {
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";
import { useEffect, createContext, useContext, useState } from "react";

import AppConstants from "@/lib/constants";

interface PurchasesContextProps {
  isLoading: boolean;
  offeringIDs: string[];
  offerings: PurchasesOffering[];

  purchasePackage: (pkg: PurchasesPackage) => Promise<void>;
}

const PurchasesContext = createContext<PurchasesContextProps>(
  {} as PurchasesContextProps,
);

const PurchasesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Whether or not the offerings are loading
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // A list of all the available offering IDs
  const [offeringIDs, setOfferingIDs] = useState<string[]>([]);
  // A list of all the available offerings
  const [offerings, setOfferings] = useState<PurchasesOffering[]>([]);

  // Fetch all products/offerings/packages on initial app load only
  useEffect(() => {
    // Configure RevenueCat
    Purchases.configure({
      apiKey: AppConstants.revenueCatPublicKey,
    });

    const fetchOfferings = async () => {
      // Get all offerings from RevenueCat
      const RCOfferings = (await Purchases.getOfferings()).all;
      // Get all packages with metadata that have a key of "available" and a value of true
      const RCCurrentOfferingIDs = Object.keys(RCOfferings).filter(
        (key) => RCOfferings[key].metadata.available,
      );
      // Return the same PackageOffering object but only with the packages that are available
      const RCCurrentOfferings = RCCurrentOfferingIDs.map(
        (key) => RCOfferings[key],
      );

      // Sort the packages by price (lowest to highest)
      RCCurrentOfferings.forEach((offering) => {
        offering.availablePackages.sort(
          (a, b) => a.product.price - b.product.price,
        );
      });

      // If there are any offerings, set the state
      if (RCCurrentOfferings.length > 0) {
        // Set the offering IDs to be used in the Billing screen
        // These are the options on the segmented control
        setOfferingIDs(RCCurrentOfferingIDs);
        // Set the offerings to be used in the Billing screen
        setOfferings(RCCurrentOfferings);
      }

      // Set the loading state to false
      setIsLoading(false);
    };

    fetchOfferings();
  }, []);

  const purchasePackage = async (pkg: PurchasesPackage) => {
    try {
      await Purchases.purchasePackage(pkg);
    } catch (error) {}
  };

  return (
    <PurchasesContext.Provider
      value={{ isLoading, offeringIDs, offerings, purchasePackage }}
    >
      {children}
    </PurchasesContext.Provider>
  );
};

export const usePurchases = () => useContext(PurchasesContext);

export default PurchasesProvider;

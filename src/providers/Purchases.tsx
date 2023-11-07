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
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppConstants from "@/constants";

interface PurchasesContextProps {
  isLoading: boolean;
  offering?: PurchasesOffering;

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
  // A list of all the current offering
  const [offering, setOffering] = useState<PurchasesOffering>();

  // Fetch all products/offerings/packages on initial app load only
  useEffect(() => {
    const init = async () => {
      const currentCustomerId = await AsyncStorage.getItem("customerId");

      // Configure RevenueCat
      Purchases.configure({
        apiKey: AppConstants.revenueCatPublicKey,
        appUserID: currentCustomerId || undefined,
      });

      // Get all offerings from RevenueCat
      const RCCurrentOffering = (await Purchases.getOfferings()).current;

      // If there is a current offering...
      if (RCCurrentOffering) {
        // Set the offerings to be used in the Billing screen
        setOffering(RCCurrentOffering);
      }

      // Set the loading state to false
      setIsLoading(false);
    };

    init();
  }, []);

  const purchasePackage = async (pkg: PurchasesPackage) => {
    try {
      await Purchases.purchasePackage(pkg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PurchasesContext.Provider value={{ isLoading, offering, purchasePackage }}>
      {children}
    </PurchasesContext.Provider>
  );
};

export const usePurchases = () => useContext(PurchasesContext);

export default PurchasesProvider;

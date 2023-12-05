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
import * as Sentry from "sentry-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, createContext, useContext, useState } from "react";

import AppConstants from "@/constants";
import Toast from "react-native-toast-message";

interface IAPContextProps {
  isLoading: boolean;
  offering?: PurchasesOffering;

  restorePurchases: () => Promise<void>;
  purchasePackage: (pkg: PurchasesPackage) => Promise<void>;
}

const IAPContext = createContext<IAPContextProps>({} as IAPContextProps);

const IAPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  /**
   * Purchase a package from RevenueCat
   */
  const purchasePackage = async (pkg: PurchasesPackage) => {
    try {
      await Purchases.purchasePackage(pkg);
    } catch (error) {
      Sentry.Native.captureException(error);
    }
  };

  /**
   * Restore purchases from RevenueCat
   */
  const restorePurchases = async () => {
    try {
      await Purchases.restorePurchases();

      Toast.show({
        type: "success",
        text1: "Purchases Restored",
        text2: "Your purchases have been successfully restored.",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "No Purchases Found",
        text2: "There are no purchases to restore for this account.",
      });
    }
  };

  return (
    <IAPContext.Provider
      value={{ isLoading, offering, restorePurchases, purchasePackage }}
    >
      {children}
    </IAPContext.Provider>
  );
};

export const useIAPs = () => useContext(IAPContext);

export default IAPProvider;

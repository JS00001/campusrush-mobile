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

import { useEffect, createContext, useContext, useState } from "react";
import Purchases, { PurchasesPackage } from "react-native-purchases";

import AppConstants from "@/lib/constants";

interface PurchasesContextProps {}

const PurchasesContext = createContext<PurchasesContextProps>(
  {} as PurchasesContextProps,
);

const PurchasesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    Purchases.configure({ apiKey: AppConstants.revenueCatPublicKey });

    const fetchOfferings = async () => {
      const offerings = await Purchases.getOfferings();
      const currentPackages = offerings.current?.availablePackages;

      if (currentPackages) {
        setPackages(currentPackages);
      }
    };

    fetchOfferings();
  }, []);

  return <>{children}</>;
};

export const usePurchases = () => useContext(PurchasesContext);

export default PurchasesProvider;

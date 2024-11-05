/*
 * Created on Wed Mar 06 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import Qonversion, {
  PurchaseModel,
  Entitlement,
} from "react-native-qonversion";
import * as Sentry from "@sentry/react-native";
import Toast from "react-native-toast-message";
import { createContext, useEffect, useState, useContext } from "react";

import qonversionConfig from "@/lib/qonversion";

interface IQonversionContext {
  /** Whether or not the Qonversion SDK is fetching its initial values. */
  isLoading: boolean;
  /** The ids of the active entitlements. */
  entitlementIds: string[];
  /** The active entitlements. */
  entitlements: Entitlement[];

  /** Restore purchases by checking if the account has any active entitlements. */
  restorePurchases(): Promise<void>;
  /** Update the active entitlements to match the server. */
  checkEntitlements(): Promise<void>;
  /** Purchase the selected product. */
  purchaseProduct(purchaseModal: PurchaseModel): Promise<void>;
  /** Set the active entitlements. */
  setEntitlements(entitlements: Map<string, Entitlement>): void;
}

const QonversionContext = createContext<IQonversionContext>(
  {} as IQonversionContext,
);

const QonversionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [entitlementIds, setEntitlementIds] = useState<string[]>([]);
  const [entitlementState, setEntitlementState] = useState<Entitlement[]>([]);

  /**
   * On initial load, set the entitlements for the user
   * so we know if they are authorized
   */
  useEffect(() => {
    (async () => {
      // Now, we need to initialize the qonversion SDK
      // so we can handle in-app purchases
      Qonversion.initialize(qonversionConfig);
      await checkEntitlements();
      setIsLoading(false);
    })();
  }, []);

  /**
   * Takes an array of entitlements and sets the active entitlements
   * using only their ids.
   */
  const setEntitlements = (entitlements: Map<string, Entitlement>) => {
    const activeEntitlements = Array.from(entitlements.values()).filter(
      (entitlement) => entitlement.isActive,
    );

    const activeEntitlementIds = activeEntitlements.map(
      (entitlement) => entitlement.id,
    );

    setEntitlementState(activeEntitlements);
    setEntitlementIds(activeEntitlementIds);
  };

  /**
   * Get the active entitlements from the Qonversion SDK
   * and set the active entitlements using only their ids.
   */
  const checkEntitlements = async () => {
    const qonversionInstance = Qonversion.getSharedInstance();
    const fetchedEntitlements = await qonversionInstance.checkEntitlements();

    setEntitlements(fetchedEntitlements);
  };

  /**
   * Restore purchases by checking if the
   * account has any active entitlements.
   */
  const restorePurchases = async () => {
    try {
      const entitlements = await Qonversion.getSharedInstance().restore();

      setEntitlements(entitlements);

      Toast.show({
        type: "error",
        text1: "No purchases found",
        text2: "You have no purchases to restore",
      });
    } catch (e) {
      Sentry.captureException(e);
    }
  };

  /**
   * When the purchase button is pressed, purchase the selected product, do
   * not throw an error if the buyer cancels the purchase
   */
  const purchaseProduct = async (purchaseModel: PurchaseModel) => {
    try {
      const qonversionInstance = Qonversion.getSharedInstance();
      const entitlements = await qonversionInstance.purchase(purchaseModel);

      setEntitlements(entitlements);
    } catch (e: any) {
      if (e.userCancelled) return;
      Sentry.captureException(e);
    }
  };

  return (
    <QonversionContext.Provider
      value={{
        isLoading,
        entitlements: entitlementState,
        entitlementIds,

        purchaseProduct,
        restorePurchases,
        setEntitlements,
        checkEntitlements,
      }}
    >
      {children}
    </QonversionContext.Provider>
  );
};

export const useQonversion = () => useContext(QonversionContext);

export default QonversionProvider;

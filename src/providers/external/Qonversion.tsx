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
  UserPropertyKey,
} from "react-native-qonversion";
import * as Sentry from "@sentry/react-native";
import Toast from "react-native-toast-message";
import { createContext, useEffect, useState, useContext } from "react";

import type { IChapter } from "@/types";

import qonversionConfig from "@/lib/qonversion";

interface IQonversionContext {
  /** The active entitlements. */
  entitlements: Entitlement[];

  /** Login the user with the chapter data */
  login(chapter: IChapter): Promise<void>;
  /** Logout the user */
  logout(): Promise<void>;
  /** Restore purchases by checking if the account has any active entitlements. */
  restorePurchases(): Promise<void>;
  /** Update the active entitlements to match the server. */
  checkEntitlements(): Promise<void>;
  /** Purchase the selected product. */
  purchaseProduct(purchaseModal: PurchaseModel): Promise<void>;
  /** Set the active entitlements. */
  setEntitlements(entitlements: Entitlement[]): void;
}

const QonversionContext = createContext<IQonversionContext>(
  {} as IQonversionContext,
);

const QonversionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);

  /**
   * On initial load, set the entitlements for the user
   * so we know if they are authorized
   */
  useEffect(() => {
    Qonversion.initialize(qonversionConfig);
  }, []);

  /**
   * Take a chapter and login the user so they can access
   * their entitlements
   */
  const login = async (chapter: IChapter) => {
    Qonversion.getSharedInstance().identify(chapter.billing.qonversionId);
    Qonversion.getSharedInstance().setUserProperty(
      UserPropertyKey.EMAIL,
      chapter.email,
    );

    await checkEntitlements();
  };

  /**
   * Logout the user and remove their entitlements
   */
  const logout = async () => {
    Qonversion.getSharedInstance().logout();
    setEntitlements([]);
  };

  /**
   * Takes an array of entitlements and sets the active entitlements
   * using only their ids.
   */
  const setActiveEntitlements = (entitlements: Map<string, Entitlement>) => {
    const activeEntitlements = Array.from(entitlements.values()).filter(
      (entitlement) => entitlement.isActive,
    );

    setEntitlements(activeEntitlements);
  };

  /**
   * Get the active entitlements from the Qonversion SDK
   * and set the active entitlements using only their ids.
   */
  const checkEntitlements = async () => {
    const qonversionInstance = Qonversion.getSharedInstance();
    const fetchedEntitlements = await qonversionInstance.checkEntitlements();

    setActiveEntitlements(fetchedEntitlements);
  };

  /**
   * Restore purchases by checking if the
   * account has any active entitlements.
   */
  const restorePurchases = async () => {
    try {
      const entitlements = await Qonversion.getSharedInstance().restore();
      setActiveEntitlements(entitlements);

      Toast.show({
        type: "success",
        text1: "Purchases restored",
        text2: "Your purchases have been restored",
      });
    } catch (e) {
      Sentry.captureException(e);
      Toast.show({
        type: "error",
        text1: "No purchases found",
        text2: "You have no purchases to restore",
      });
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

      setActiveEntitlements(entitlements);
    } catch (e: any) {
      if (e.userCancelled) return;
      Sentry.captureException(e);
    }
  };

  return (
    <QonversionContext.Provider
      value={{
        entitlements,

        login,
        logout,
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

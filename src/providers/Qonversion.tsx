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

import Qonversion from "react-native-qonversion";
import { Entitlement } from "react-native-qonversion";
import { createContext, useEffect, useState, useContext } from "react";

interface IQonversionContext {
  isPro: boolean;
  isLoading: boolean;
  entitlementIds: string[];
  entitlements: Map<string, Entitlement>;

  checkEntitlements(): Promise<void>;
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
  // prettier-ignore
  const [entitlementState, setEntitlementState] = useState<Map<string, Entitlement>>(new Map());

  useEffect(() => {
    (async () => {
      await checkEntitlements();
      setIsLoading(false);
    })();
  }, []);

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

    setEntitlementState(entitlements);
    setEntitlementIds(activeEntitlementIds);
  };

  /**
   * Whether or not the user has a pro subscription.
   */
  const isPro = entitlementIds.includes("pro");

  return (
    <QonversionContext.Provider
      value={{
        isPro,
        isLoading,
        entitlements: entitlementState,
        entitlementIds,

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

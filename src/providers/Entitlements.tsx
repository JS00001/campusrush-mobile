/*
 * Created on Wed Nov 08 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useEffect, useContext, createContext } from "react";

import { useEntitlementStore } from "@/store";
import { useGetEntitlements } from "@/hooks/api/billing";

interface EntitlementsContextProps {
  isLoading: boolean;
}

const EntitlementsContext = createContext<EntitlementsContextProps>({
  isLoading: true,
});

const EntitlementsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const query = useGetEntitlements();
  const setEntitlements = useEntitlementStore((s) => s.setEntitlements);

  useEffect(() => {
    if (!query.data || "error" in query.data) return;

    if (query.data.data) {
      setEntitlements(query.data.data);
    }
  }, [query.data]);

  return (
    <EntitlementsContext.Provider value={{ isLoading: query.isLoading }}>
      {children}
    </EntitlementsContext.Provider>
  );
};

export const useEntitlements = () => useContext(EntitlementsContext);

export default EntitlementsProvider;

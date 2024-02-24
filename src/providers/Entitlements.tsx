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

import { useQuery } from "@tanstack/react-query";
import { useEffect, useContext, createContext } from "react";

import billingApi from "@/apiv1/billing";
import useEntitlementsStore from "@/statev1/entitlements";

interface EntitlementsContextProps {
  isLoading: boolean;
}

const EntitlementsContext = createContext<EntitlementsContextProps>({
  isLoading: true,
});

const EntitlementsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Create a query to get the chapter statistics
  const query = useQuery({
    // The query is unauthorized and always the same so we dont need to use an access token
    queryKey: ["entitlements"],
    queryFn: async () => {
      return billingApi.getEntitlements();
    },
  });

  // Get the entitlements store
  const setEntitlementDetails = useEntitlementsStore(
    (state) => state.setEntitlementDetails,
  );

  // Extract the data from the query
  useEffect(() => {
    // If there is valid response data, set the entitlements
    if (query.data?.data?.data) {
      setEntitlementDetails(query.data?.data?.data as EntitlementDetails);
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

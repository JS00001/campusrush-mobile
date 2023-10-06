/*
 * Created on Wed Oct 4 2023
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

import { useAuth } from "@/providers/Auth";
import messagingApi from "@/api/api/messaging";

const useContacts = () => {
  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Create a query to get the organization statistics
  const query = useQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["contacts", accessToken],
    // This is so we can call the query when the bottom sheet is opened
    enabled: false,
    queryFn: async () => {
      return messagingApi.getContacts();
    },
  });

  // Extract the data from the query
  const allPnms = query.data?.data?.data?.all ?? [];
  const uncontactedPnms = query.data?.data?.data?.uncontacted ?? [];

  return {
    ...query,
    allPnms,
    uncontactedPnms,
  };
};

export default useContacts;

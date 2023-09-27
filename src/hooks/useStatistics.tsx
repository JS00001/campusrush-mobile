/*
 * Created on Tue Aug 29 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useAuth } from "@/providers/Auth";
import { useQuery } from "@tanstack/react-query";

import organizationApi from "@/api/api/organization";

const useStatistics = () => {
  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Create a query to get the organization statistics
  const query = useQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["statistics", accessToken],
    queryFn: async () => {
      return organizationApi.getOrganizationStatistics();
    },
  });

  // Extract the data from the query
  const numPnms = query.data?.data?.data.numPnms || 0;
  const numBids = query.data?.data?.data.numPnmsWithBid || 0;
  const recentPnms = query.data?.data?.data.recentPnms || [];

  return {
    ...query,
    numPnms,
    numBids,
    recentPnms,
  };
};

export default useStatistics;

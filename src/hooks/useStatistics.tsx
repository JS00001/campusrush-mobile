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

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/providers/Auth";
import organizationApi from "@/api/api/organization";
import useStatisticsStore from "@/state/statistics";

const useStatistics = () => {
  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Get the statistics store
  const {
    numPnms,
    numBids,
    recentPnms,
    setNumBids,
    setRecentPnms,
    setNumPnms,
  } = useStatisticsStore();

  // Create a query to get the organization statistics
  const query = useQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["statistics", accessToken],
    queryFn: async () => {
      return organizationApi.getOrganizationStatistics();
    },
  });

  // Extract the data from the query
  useEffect(() => {
    if (query.data?.data?.data) {
      setNumPnms(query.data?.data?.data.numPnms || 0);
      setNumBids(query.data?.data?.data.numPnmsWithBid || 0);
      setRecentPnms(query.data?.data?.data.recentPnms || []);
    }
  }, [query.data?.data?.data]);

  return {
    ...query,
    numPnms,
    numBids,
    recentPnms,
  };
};

export default useStatistics;

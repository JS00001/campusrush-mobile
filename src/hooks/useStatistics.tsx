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
import useStatisticsStore from "@/state/statistics";
import organizationApi from "@/api/api/organization";

const useStatistics = () => {
  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Get the statistics store
  const {
    numPnms,
    recentPnms,
    numStarredPnms,

    setNumPnms,
    setRecentPnms,
    setNumStarredPnms,
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
    // If there is valid response data, set the statistics in the store
    if (query.data?.data?.data) {
      setNumPnms(query.data?.data?.data.pnms || 0);
      setNumStarredPnms(query.data?.data?.data.starredPnms || 0);
      setRecentPnms(query.data?.data?.data.recentPnms || []);
    }
  }, [query.data]);

  return {
    ...query,
    numPnms,
    numStarredPnms,
    recentPnms,
  };
};

export default useStatistics;

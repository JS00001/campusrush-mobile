/*
 * Created on Sat Sep 02 2023
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

import pnmsApi from "@/api/api/pnms";
import { useAuth } from "@/providers/Auth";

const usePnms = () => {
  // The default page size for pagination
  const PAGE = 1;
  const PAGE_SIZE = 700;

  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Create a query to get the organization statistics
  const query = useQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["listPnms", PAGE, accessToken],
    queryFn: async () => {
      return pnmsApi.getPnms({
        page: PAGE,
        pageSize: PAGE_SIZE,
      });
    },
    keepPreviousData: true,
  });

  // Extract the data from the query
  const pnms = query.data?.data?.data.pnms || [];

  return {
    ...query,
    pnms,
  };
};

export default usePnms;

/*
 * Created on Tue Nov 14 2023
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

import contentApi from "@/api/content";

const usePrivacyPolicy = () => {
  // Create a query to get the organization statistics
  const query = useQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["privacyPolicy"],
    // This is so we can call the query when the bottom sheet is opened
    enabled: false,
    queryFn: async () => {
      return contentApi.getPrivacyPolicy();
    },
  });

  return query;
};

export default usePrivacyPolicy;

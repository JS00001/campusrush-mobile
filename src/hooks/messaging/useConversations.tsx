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

const useConversations = () => {
  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Create a query to get the organization statistics
  const query = useQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["conversations", accessToken],
    queryFn: async () => {
      return messagingApi.getConversations();
    },
  });

  // Extract the data from the query
  const conversations = query.data?.data?.data.conversations ?? [];

  return {
    ...query,
    conversations,
  };
};

export default useConversations;

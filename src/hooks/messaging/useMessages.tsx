/*
 * Created on Sub Oct 9 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useInfiniteQuery } from "@tanstack/react-query";

import { useAuth } from "@/providers/Auth";
import messagingApi from "@/api/api/messaging";

const useMessages = (pnmId: string) => {
  // Get access token so that we can cache the query
  const { accessToken } = useAuth();

  // Create a query to get the organizations messages
  const query = useInfiniteQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["messaging", accessToken, pnmId],
    queryFn: async ({ pageParam = 0 }) => {
      return messagingApi.getMessages({
        limit: 50,
        offset: pageParam,
        pnmId: pnmId || "",
      });
    },
    getNextPageParam: (lastPage) => {
      // If there are no more messages, return undefined
      if (lastPage.data.data.messages.length < 50) return undefined;
      // Otherwise, return the next offset
      return lastPage.data.data.nextOffset;
    },
  });

  // Combine the messages from all pages
  const messages = query.data?.pages.flatMap((page) => page.data.data.messages);

  return {
    ...query,
    messages,
  };
};

export default useMessages;

/*
 * Created on Fri Feb 23 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { useAuth } from "@/providers/Auth";
import { getContacts, getConversation, getConversations } from "@/api";

export const useGetContacts = () => {
  const { accessToken } = useAuth();

  return useQuery(["contacts", accessToken], {
    queryFn: () => {
      return getContacts();
    },
  });
};

export const useGetConversation = (pnmId: string) => {
  const { accessToken } = useAuth();

  return useInfiniteQuery({
    queryKey: ["conversation", accessToken, pnmId],
    queryFn: ({ pageParam = 0 }) => {
      return getConversation({ offset: pageParam, pnmId });
    },
    getNextPageParam: (lastPage) => {
      if ("error" in lastPage) return undefined;

      const hasNextPage = lastPage.data.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.data.nextOffset;
    },
  });
};

export const useGetConversations = () => {
  const { accessToken } = useAuth();

  return useInfiniteQuery(["conversations", accessToken], {
    queryFn: ({ pageParam = 0 }) => {
      return getConversations({ offset: pageParam });
    },
    getNextPageParam: (lastPage) => {
      if ("error" in lastPage) return undefined;

      const hasNextPage = lastPage.data.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.data.nextOffset;
    },
  });
};

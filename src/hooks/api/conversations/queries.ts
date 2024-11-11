/*
 * Created on Sat Nov 09 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useInfiniteQuery } from '@tanstack/react-query';

import { getConversation, getConversations } from '@/api';

/**
 * Get the messages for a specific conversation
 */
export const useGetConversation = (pnmId: string) => {
  const query = useInfiniteQuery({
    staleTime: 0,
    initialPageParam: 0,
    queryKey: ['conversation', pnmId],
    queryFn: async ({ pageParam }) => {
      const response = await getConversation({ offset: pageParam, pnmId });
      if ('error' in response) throw response;
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if ('error' in lastPage) return undefined;

      const hasNextPage = lastPage.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.nextOffset;
    },
  });

  // Combine all of the paginated data into one array
  const pages = query.data?.pages ?? [];
  const conversation = pages[0]?.conversation;
  const messages = pages.flatMap((page) => {
    return page.conversation?.messages ?? [];
  });

  return {
    ...query,
    conversation,
    messages,
  };
};

/**
 * Get all of the conversations the chapter has
 */
export const useGetConversations = () => {
  const query = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['conversations'],
    queryFn: async ({ pageParam }) => {
      const response = await getConversations({ offset: pageParam });
      if ('error' in response) throw response;
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if ('error' in lastPage) return undefined;

      const hasNextPage = lastPage.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.nextOffset;
    },
  });

  // Combine all of the paginated data into one array
  const pages = query.data?.pages ?? [];
  const conversations = pages.flatMap((page) => page.conversations);

  return {
    ...query,
    conversations,
  };
};

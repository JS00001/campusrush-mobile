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

import { useDebounce } from 'use-debounce';
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
  const conversation = pages.length ? pages[0].conversation : undefined;
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
export const useGetConversations = (search: string = '') => {
  const [debouncedSearch] = useDebounce(search, 300);

  const query = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['conversations', debouncedSearch],
    queryFn: async ({ pageParam }) => {
      const response = await getConversations({
        offset: pageParam,
        search: debouncedSearch,
      });
      if ('error' in response) throw response;
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if ('error' in lastPage) return undefined;
      const hasNextPage = lastPage.hasNextPage;
      if (!hasNextPage) return undefined;
      return lastPage.nextOffset;
    },
    // Each debouncedSearch update causes a new search with a new isLoading state
    // so we need to prevent this state by using the previous response.
    placeholderData: (prev) => prev,
  });

  // Combine all of the paginated data into one array
  const pages = query.data?.pages ?? [];
  // Get the unreadCount from the last fetched page, since this is most recent
  const unreadCount = pages[pages.length - 1]?.unreadCount ?? 0;
  const conversations = pages.flatMap((page) => page.conversations);

  return {
    ...query,
    unreadCount,
    conversations,
  };
};

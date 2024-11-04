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

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useAuth } from '@/providers/Auth';
import { useConversationStore } from '@/store';
import { getConversation, getConversations } from '@/api';

/**
 * Get the messages for a specific conversation
 */
export const useGetConversation = (pnmId: string) => {
  const { accessToken } = useAuth();

  return useInfiniteQuery({
    cacheTime: 0,
    queryKey: ['conversation', accessToken, pnmId],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getConversation({ offset: pageParam, pnmId });
      if ('error' in response) throw response;
      return response;
    },
    getNextPageParam: (lastPage) => {
      if ('error' in lastPage) return undefined;

      const hasNextPage = lastPage.data.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.data.nextOffset;
    },
  });
};

/**
 * Get all of the conversations the chapter has
 */
export const useGetConversations = () => {
  const { accessToken } = useAuth();
  const conversations = useConversationStore((s) => s.conversations);
  const setConversations = useConversationStore((s) => s.setConversations);

  const query = useInfiniteQuery({
    cacheTime: 0,
    queryKey: ['conversations', accessToken],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getConversations({ offset: pageParam });
      if ('error' in response) throw response;
      return response;
    },
    getNextPageParam: (lastPage) => {
      if ('error' in lastPage) return undefined;

      const hasNextPage = lastPage.data.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.data.nextOffset;
    },
  });

  useEffect(() => {
    if (!query.data || query.isError) {
      return;
    }

    const combinedConversations = query.data.pages.flatMap((page) => {
      return page.data.conversations;
    });

    setConversations(combinedConversations);
  }, [query.data]);

  return {
    ...query,
    conversations,
    isLoading: query.isLoading && !conversations.length,
  };
};

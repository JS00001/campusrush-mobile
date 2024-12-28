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

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { ChapterRole } from '@/@types';
import { useUser } from '@/providers/User';
import { getChapterNotifications, getChapterUsers } from '@/api';

/**
 * Get a list of the chapter's notifications
 */
export const useGetNotifications = () => {
  const query = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['notifications'],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getChapterNotifications({ offset: pageParam });
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

  // Combine all the notifications into a single array
  const pages = query.data?.pages ?? [];
  const count = pages.length ? pages[0].count : 0;

  const notifications = pages.flatMap((page) => {
    return page.notifications;
  });

  return {
    ...query,
    data: {
      ...query.data,
      count,
      notifications,
    },
  };
};

/**
 * Get a list of all the chapter's sub-users
 */
export const useGetChapterUsers = () => {
  const { hasPermission } = useUser();

  const query = useQuery({
    enabled: hasPermission(ChapterRole.Admin),
    queryKey: ['chapterUsers'],
    queryFn: async () => {
      const res = await getChapterUsers();
      if ('error' in res) throw res;
      return res.data;
    },
  });

  return query;
};

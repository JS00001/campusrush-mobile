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
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import {
  getChapterStatistics,
  getChapterSessions,
  getChapterNotifications,
} from '@/api';
import { useAuth } from '@/providers/Auth';
import { useNotificationStore, useStatisticsStore } from '@/store';

/**
 * Get the chapter's statistics
 */
export const useGetChapterStatistics = () => {
  const { accessToken } = useAuth();
  const statisticsStore = useStatisticsStore();

  const query = useQuery(['chapterStatistics', accessToken], {
    queryFn: async () => {
      const response = await getChapterStatistics();
      if ('error' in response) throw response;
      return response;
    },
  });

  useEffect(() => {
    if (!query.data || query.isError) {
      return;
    }

    statisticsStore.setField('pnmCount', query.data.data.pnms);
    statisticsStore.setField('recentPnms', query.data.data.recentPnms);
    statisticsStore.setField('starredPnmCount', query.data.data.starredPnms);
  }, [query.data]);

  return {
    ...query,
    pnmCount: statisticsStore.pnmCount,
    starredPnmCount: statisticsStore.starredPnmCount,
    recentPnms: statisticsStore.recentPnms,
    isLoading: query.isLoading && !statisticsStore.pnmCount,
  };
};

export const useGetChapterSessions = () => {
  const { accessToken } = useAuth();

  return useQuery(['chapterSessions', accessToken], {
    queryFn: async () => {
      const response = await getChapterSessions();
      if ('error' in response) throw response;
      return response;
    },
  });
};

/**
 * Get a list of the chapter's notifications
 */
export const useGetNotifications = () => {
  const { accessToken } = useAuth();
  const notificationStore = useNotificationStore();

  const query = useInfiniteQuery(['notifications', accessToken], {
    cacheTime: 0,
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getChapterNotifications({ offset: pageParam });
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

    const combinedNotifications = query.data.pages.flatMap((page) => {
      return page.data.notifications;
    });

    notificationStore.setState({
      count: query.data.pages[0].data.count,
      notifications: combinedNotifications,
    });
  }, [query.data]);

  return {
    ...query,
    count: notificationStore.count,
    notifications: notificationStore.notifications,
    isLoading: query.isLoading && !query.data,
  };
};

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

import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useAuth } from '@/providers/Auth';
import { useNotificationStore, useStatisticsStore } from '@/store';
import {
  getChapterStatistics,
  getChapterSessions,
  getChapterNotifications,
} from '@/api';

export const useGetChapterStatistics = () => {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(query.isLoading);
      return;
    }

    statisticsStore.setField('pnmCount', query.data.data.pnms);
    statisticsStore.setField('recentPnms', query.data.data.recentPnms);
    statisticsStore.setField('starredPnmCount', query.data.data.starredPnms);

    setIsLoading(query.isLoading);
  }, [query.data]);

  return {
    ...query,
    pnmCount: statisticsStore.pnmCount,
    starredPnmCount: statisticsStore.starredPnmCount,
    recentPnms: statisticsStore.recentPnms,
    isLoading: isLoading && !statisticsStore.pnmCount,
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

export const useGetNotifications = () => {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(query.isLoading);
      return;
    }

    const combinedNotifications = query.data.pages.flatMap((page) => {
      return page.data.notifications;
    });

    notificationStore.setState({
      count: query.data.pages[0].data.count,
      notifications: combinedNotifications,
    });

    setIsLoading(query.isLoading);
  }, [query.data]);

  return {
    ...query,
    isLoading: isLoading && !query.data,
    count: notificationStore.count,
    notifications: notificationStore.notifications,
  };
};

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

import { useQuery } from '@tanstack/react-query';

import {
  getAdminChapter,
  getAdminChapterEntitlements,
  getAdminChapters,
  getAdminStatistics,
  getViolations,
} from '@/api';

export const useGetAdminChapters = () => {
  const query = useQuery({
    queryKey: ['adminChapters'],
    queryFn: async () => {
      const response = await getAdminChapters();
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

export const useGetViolations = () => {
  const query = useQuery({
    queryKey: ['violations'],
    queryFn: async () => {
      const response = await getViolations();
      if ('error' in response) throw response;
      return response.data;
    },
  });
  return query;
};

export const useGetAdminChapter = (id: string) => {
  const query = useQuery({
    queryKey: ['adminChapter', id],
    queryFn: async () => {
      const response = await getAdminChapter({ id });
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

export const useGetEntitlements = (id: string) => {
  const query = useQuery({
    queryKey: ['adminChapterEntitlements', id],
    queryFn: async () => {
      const response = await getAdminChapterEntitlements({ id });
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

export const useGetAdminStatistics = () => {
  const query = useQuery({
    queryKey: ['adminStatistics'],
    queryFn: async () => {
      const response = await getAdminStatistics();
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

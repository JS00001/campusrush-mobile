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
import { useQuery } from '@tanstack/react-query';
import type { Entitlement } from 'qonversion-sdk';

import type { Chapter } from '@/types';

import {
  getAdminChapter,
  getAdminChapterEntitlements,
  getAdminChapters,
} from '@/api';
import { useAuth } from '@/providers/Auth';

export const useGetAdminChapters = () => {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const query = useQuery(['adminChapters', accessToken], {
    queryFn: async () => {
      return getAdminChapters();
    },
  });

  useEffect(() => {
    if (!query.data || 'error' in query.data) {
      setIsLoading(query.isLoading);
      return;
    }

    setChapters(query.data.data.chapters);
    setIsLoading(query.isLoading);
  }, [query.data]);

  return {
    ...query,
    chapters,
    isLoading: isLoading && !chapters.length,
  };
};

export const useGetAdminChapter = (id: string) => {
  const { accessToken } = useAuth();
  const [chapter, setChapter] = useState<Chapter | null>(null);

  const query = useQuery(['adminChapter', accessToken, id], {
    queryFn: async () => {
      return getAdminChapter({ id });
    },
  });

  useEffect(() => {
    if (!query.data || 'error' in query.data) return;

    setChapter(query.data.data.chapter);
  }, [query.data]);

  return {
    ...query,
    chapter,
  };
};

export const useGetAdminChapterEntitlements = (id: string) => {
  const { accessToken } = useAuth();
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);

  const query = useQuery(['adminChapterEntitlements', accessToken, id], {
    queryFn: async () => {
      return getAdminChapterEntitlements({ id });
    },
  });

  useEffect(() => {
    if (!query.data || 'error' in query.data) return;

    setEntitlements(query.data.data);
  }, [query.data]);

  return {
    ...query,
    entitlements,
  };
};

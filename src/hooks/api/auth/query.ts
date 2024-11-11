/*
 * Created on Sun Oct 27 2024
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

import type { RefreshAccessTokenResponse } from '@/types';

import axios from '@/lib/axios';
import { getChapter } from '@/api';
import usePosthog from '@/hooks/usePosthog';
import { getRefreshToken, setAccessToken } from '@/lib/auth';
import { useQonversion } from '@/providers/external/Qonversion';

export const useGetChapter = () => {
  const posthog = usePosthog();
  const qonversion = useQonversion();

  const query = useQuery({
    retry: 0,
    staleTime: Infinity,
    queryKey: ['chapter'],
    queryFn: async () => {
      const response = await getChapter();
      if ('error' in response) throw response;
      const chapter = response.data.chapter;
      // Login to 3rd party services
      await qonversion.login(chapter);
      posthog.identify(chapter._id, { role: chapter.role });
      return response.data;
    },
  });

  return query;
};

export const useRefreshAccessToken = () => {
  return useQuery({
    retry: 0,
    staleTime: Infinity,
    queryKey: ['refresh'],
    queryFn: async () => {
      const refreshToken = await getRefreshToken();
      const { data: response } = await axios.post<RefreshAccessTokenResponse>(
        `/auth/refresh`,
        undefined,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      if ('error' in response) throw response;
      setAccessToken(response.data.accessToken);
      return response.data;
    },
  });
};

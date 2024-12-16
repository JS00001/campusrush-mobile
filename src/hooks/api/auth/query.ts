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
import { getRefreshToken, setAccessToken } from '@/lib/auth';
import { getChapterInvite } from '@/api';

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

export const useGetChapterInvite = (id: string) => {
  const query = useQuery({
    queryKey: ['chapterInvite', id],
    queryFn: async () => {
      const res = await getChapterInvite({ id });
      if ('error' in res) throw res;
      return res.data;
    },
  });

  return query;
};

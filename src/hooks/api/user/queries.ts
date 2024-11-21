/*
 * Created on Mon Nov 18 2024
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

import usePosthog from '@/hooks/usePosthog';
import { getUser } from '@/api/requests/user';
import { useQonversion } from '@/providers/external/Qonversion';

export const useGetUser = () => {
  const posthog = usePosthog();
  const qonversion = useQonversion();

  const query = useQuery({
    retry: 0,
    staleTime: Infinity,
    queryKey: ['user'],
    queryFn: async () => {
      const response = await getUser();
      if ('error' in response) throw response;
      const chapter = response.data.chapter;
      const user = response.data.user;
      // Login to 3rd party services
      await qonversion.login(chapter);
      posthog.identify(chapter._id, {
        systemRole: user.systemRole,
        chapterRole: user.chapterRole,
      });
      return response.data;
    },
  });

  return query;
};

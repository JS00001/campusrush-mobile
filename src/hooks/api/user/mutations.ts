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

import { useMutation } from '@tanstack/react-query';

import type { UpdateUserRequest } from '@/@types';

import usePosthog from '@/hooks/usePosthog';
import queryClient from '@/lib/query-client';
import { updateUser } from '@/api/requests/user';

export const useUpdateUser = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: UpdateUserRequest) => {
      const response = await updateUser(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      posthog.capture('chapter_updated');
    },
  });
};

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

import { useMutation } from '@tanstack/react-query';

import type { UpdateChapterRequest } from '@/types';

import usePosthog from '@/hooks/usePosthog';
import queryClient from '@/lib/query-client';
import { updateChapter, deleteChapter } from '@/api';

export const useUpdateChapter = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: UpdateChapterRequest) => {
      const response = await updateChapter(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (response) => {
      queryClient.setQueryData(['user'], response.data);
      posthog.capture('chapter_updated');
    },
  });
};

export const useDeleteChapter = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async () => {
      const response = await deleteChapter();
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (response) => {
      queryClient.setQueryData(['user'], response.data);
      posthog.capture('chapter_deleted');
    },
  });
};

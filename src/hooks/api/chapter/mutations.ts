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

import type {
  CreateChapterUserRequest,
  UpdateChapterRequest,
  UpdateChapterUserRequest,
} from '@/types';

import {
  updateChapter,
  deleteChapter,
  createChapterUser,
  deleteChapterUser,
  updateChapterUser,
} from '@/api';
import usePosthog from '@/hooks/usePosthog';
import queryClient from '@/lib/query-client';

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

export const useCreateChapterUser = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: CreateChapterUserRequest) => {
      const res = await createChapterUser(data);
      if ('error' in res) throw res;
      return res;
    },
    onSuccess: async () => {
      posthog.capture('chapter_user_created');
    },
  });
};

export const useDeleteChapterUser = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteChapterUser({ id });
      if ('error' in res) throw res;
      return res;
    },
    onSuccess: async () => {
      posthog.capture('chapter_user_deleted');
      queryClient.invalidateQueries({ queryKey: ['chapterUsers'] });
    },
  });
};

export const useUpdateChapterUser = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: UpdateChapterUserRequest) => {
      const res = await updateChapterUser(data);
      if ('error' in res) throw res;
      return res;
    },
    onSuccess: async (res) => {
      posthog.capture('chapter_user_updated');
      // So that if we update the user's role, we can see the changes in the UI
      queryClient.invalidateQueries({ queryKey: ['user'] });
      await queryClient.refetchQueries({ queryKey: ['chapterUsers'] });
    },
  });
};

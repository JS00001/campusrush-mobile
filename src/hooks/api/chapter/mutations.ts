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
  DeleteChapterSessionRequest,
  UpdateChapterRequest,
} from '@/types';

import { updateChapter, deleteChapter, deleteChapterSession } from '@/api';

export const useUpdateChapter = () => {
  return useMutation({
    mutationFn: async (data: UpdateChapterRequest) => {
      const response = await updateChapter(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useDeleteChapter = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await deleteChapter();
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useDeleteChapterSession = () => {
  return useMutation({
    mutationFn: async (data: DeleteChapterSessionRequest) => {
      const response = await deleteChapterSession(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

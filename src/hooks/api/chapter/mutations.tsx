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

import { useMutation } from "@tanstack/react-query";

import { updateChapter, deleteChapter, deleteChapterSession } from "@/api";

export const useUpdateChapter = () => {
  return useMutation({
    mutationFn: (data: UpdateChapterRequest) => {
      return updateChapter(data);
    },
  });
};

export const useDeleteChapter = () => {
  return useMutation({
    mutationFn: () => {
      return deleteChapter();
    },
  });
};

export const useDeleteChapterSession = () => {
  return useMutation({
    mutationFn: (data: DeleteChapterSessionRequest) => {
      return deleteChapterSession(data);
    },
  });
};

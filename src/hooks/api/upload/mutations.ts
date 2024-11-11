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

import { uploadFile } from '@/api';
import usePosthog from '@/hooks/usePosthog';

export const useUploadFile = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await uploadFile(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: () => {
      posthog.capture('FILE_UPLOADED');
    },
  });
};

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

import type { SendDirectMessageRequest, SendMassMessageRequest } from '@/types';

import { sendMassMessage, sendDirectMessage, uploadFile } from '@/api';

export const useSendMassMessage = () => {
  return useMutation({
    mutationFn: async (data: SendMassMessageRequest) => {
      const response = await sendMassMessage(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useSendDirectMessage = () => {
  return useMutation({
    mutationFn: async (data: SendDirectMessageRequest) => {
      const response = await sendDirectMessage(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: async (data: FormData) => {
      const response = await uploadFile(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

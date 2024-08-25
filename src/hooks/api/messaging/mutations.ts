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

import { sendMassMessage, sendDirectMessage } from '@/api';

export const useSendMassMessage = () => {
  return useMutation({
    mutationFn: (data: SendMassMessageRequest) => {
      return sendMassMessage(data);
    },
  });
};

export const useSendDirectMessage = () => {
  return useMutation({
    mutationFn: (data: SendDirectMessageRequest) => {
      return sendDirectMessage(data);
    },
  });
};

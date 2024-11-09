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

import type {
  SendMassMessageRequest,
  SendMassMessageResponse,
  SendDirectMessageRequest,
  SendDirectMessageResponse,
  UploadFileResponse,
} from '@/types';

import { axiosClient } from '@/providers/Axios';

const PREFIX = '/api/v1/consumer/messaging';

/**
 * Request:     POST /api/v1/consumer/messaging/send/mass
 * Description: Send a mass message to multiple PNMs
 */
export const sendMassMessage = async (data: SendMassMessageRequest) => {
  const url = `${PREFIX}/mass`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as SendMassMessageResponse;
};

/**
 * Request:     POST /api/v1/consumer/messaging/send/direct
 * Description: Send a message to a single PNM
 */
export const sendDirectMessage = async (data: SendDirectMessageRequest) => {
  const url = `${PREFIX}/direct`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as SendDirectMessageResponse;
};

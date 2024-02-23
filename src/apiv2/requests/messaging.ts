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

import { axiosClient } from '@/providers/Axios2';

const PREFIX = '/api/v1/consumer/messaging';

/**
 * Request:     GET /api/v1/consumer/messaging/conversation/:pnmId
 * Description: Get a conversation with a PNM
 */
export const getConversation = async (data: GetConversationRequest) => {
  const url = `${PREFIX}/conversation/${data.pnmId}`;

  const { data: responseData } = await axiosClient.get(url);

  return responseData as GetConversationResponse;
};

/**
 * Request:     GET /api/v1/consumer/messaging/conversations
 * Description: Get all conversations
 */
export const getConversations = async (data: GetConversationsRequest) => {
  const url = `${PREFIX}/conversations`;

  const { data: responseData } = await axiosClient.get(url, {
    params: data,
  });

  return responseData as GetConversationsResponse;
};

/**
 * Request:     GET /api/v1/consumer/messaging/contacts
 * Description: Get all contacts
 */
export const getContacts = async () => {
  const url = `${PREFIX}/contacts`;

  const { data } = await axiosClient.get(url);

  return data as GetContactsResponse;
};

/**
 * Request:     POST /api/v1/consumer/messaging/send/mass
 * Description: Send a mass message to multiple PNMs
 */
export const sendMassMessage = async (data: SendMassMessageRequest) => {
  const url = `${PREFIX}/send/mass`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as SendMassMessageResponse;
};

/**
 * Request:     POST /api/v1/consumer/messaging/send/direct
 * Description: Send a message to a single PNM
 */
export const sendDirectMessage = async (data: SendDirectMessageRequest) => {
  const url = `${PREFIX}/send/direct`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as SendDirectMessageResponse;
};

/*
 * Created on Wed Oct 4 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { axiosClient } from '@/providers/Axios';

// Create a new axios client for this file
const messagingAPIClient = axiosClient;
// The prefix for all routes in this file
const PREFIX = '/api/v1/messaging';

/**
 * GET /api/v1/messaging/conversation/:pnmId
 *
 * Returns
 * - data
 *  - messages
 */
const getConversation = (
  data: GetConversationInput,
): Promise<GetConversationAPIResponse> => {
  const { pnmId, ...rest } = data;

  return messagingAPIClient.get(`${PREFIX}/conversation/${pnmId}`, {
    params: rest,
  });
};

/**
 * GET /api/v1/messaging/conversations
 *
 * Returns
 * - data
 *  - conversations
 */
const getConversations = (
  data: GetConversationsInput,
): Promise<GetConversationsAPIResponse> => {
  const { offset } = data;

  return messagingAPIClient.get(`${PREFIX}/conversations`, {
    params: {
      offset,
    },
  });
};

/**
 * GET /api/v1/messaging/contacts
 *
 * Returns
 * - data
 *  - uncontacted
 *  - all
 */
const getContacts = (): Promise<GetContactsAPIResponse> => {
  return messagingAPIClient.get(`${PREFIX}/contacts`);
};

/**
 * POST /api/v1/messaging/send
 *
 * Returns
 * - data
 *  - conversations
 */
const sendMessage = (
  data: SendMessageInput,
): Promise<SendMessageAPIResponse> => {
  return messagingAPIClient.post(`${PREFIX}/send`, data);
};

export default {
  getConversation,
  getConversations,
  getContacts,
  sendMessage,
};

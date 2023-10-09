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
 * GET /api/v1/messaging/messages/:pnmId
 *
 * Returns
 * - data
 *  - messages
 */
const getMessages = (
  data: GetMessagesInput,
): Promise<GetMessagesAPIResponse> => {
  const { pnmId, ...rest } = data;

  return messagingAPIClient.get(`${PREFIX}/messages/${pnmId}`, {
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
const getConversations = (): Promise<GetConversationsAPIResponse> => {
  return messagingAPIClient.get(`${PREFIX}/conversations`);
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
  getMessages,
  getConversations,
  getContacts,
  sendMessage,
};

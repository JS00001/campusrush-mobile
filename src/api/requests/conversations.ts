/*
 * Created on Sun Aug 11 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { axiosClient } from '@/providers/Axios';

const PREFIX = '/api/v1/consumer/conversations';

/**
 * Request:     GET /api/v1/consumer/messaging/conversations
 * Description: Get all conversations
 */
export const getConversations = async (data: GetConversationsRequest) => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axiosClient.get(url, {
    params: data,
  });

  return responseData as GetConversationsResponse;
};

/**
 * Request:     GET /api/v1/consumer/conversations/:pnmId
 * Description: Get a conversation with a PNM
 */
export const getConversation = async (data: GetConversationRequest) => {
  const url = `${PREFIX}/${data.pnmId}?offset=${data.offset}`;

  const { data: responseData } = await axiosClient.get(url);

  return responseData as GetConversationResponse;
};

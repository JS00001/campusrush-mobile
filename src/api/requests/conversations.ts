import type {
  GetConversationsRequest,
  GetConversationsResponse,
  GetConversationRequest,
  GetConversationResponse,
} from '@/types';

import axios from '@/lib/axios';

const PREFIX = '/conversations';

/**
 * Request:     GET /api/v1/consumer/messaging/conversations
 * Description: Get all conversations
 */
export const getConversations = async (data: GetConversationsRequest) => {
  const url = `${PREFIX}`;
  // Remove empty string search
  const search = data.search || undefined;

  const { data: responseData } = await axios.get<GetConversationsResponse>(
    url,
    { params: { offset: data.offset, search } },
  );

  return responseData;
};

/**
 * Request:     GET /api/v1/consumer/conversations/:pnmId
 * Description: Get a conversation with a PNM
 */
export const getConversation = async (data: GetConversationRequest) => {
  const url = `${PREFIX}/${data.pnmId}?offset=${data.offset}`;

  const { data: responseData } = await axios.get<GetConversationResponse>(url);

  return responseData;
};

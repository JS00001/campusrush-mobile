import type {
  GetChapterStatisticsResponse,
  UpdateChapterRequest,
  UpdateChapterResponse,
  DeleteChapterResponse,
  GetChapterSessionsResponse,
  DeleteChapterSessionRequest,
  DeleteChapterSessionResponse,
  GetNotificationsRequest,
  GetNotificationsResponse,
} from '@/types';

import axios from '@/lib/axios';

const PREFIX = '/chapter';

/**
 * Request:     GET /api/v1/consumer/chapter/statistics
 * Description: Get a chapter's statistics
 */
export const getChapterStatistics = async () => {
  const url = `${PREFIX}/statistics`;

  const { data } = await axios.get<GetChapterStatisticsResponse>(url);

  return data;
};

/**
 * Request:     PUT /api/v1/consumer/chapter
 * Description: Update a chapter
 */
export const updateChapter = async (data: UpdateChapterRequest) => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axios.put<UpdateChapterResponse>(
    url,
    data,
  );

  return responseData;
};

/**
 * Request:     DELETE /api/v1/consumer/chapter
 * Description: Delete a chapter
 */
export const deleteChapter = async () => {
  const url = `${PREFIX}`;

  const { data } = await axios.delete<DeleteChapterResponse>(url);

  return data;
};

/**
 * Request:    GET /api/v1/consumer/chapter/sessions
 * Description: Get a chapter's sessions
 */
export const getChapterSessions = async () => {
  const url = `${PREFIX}/sessions`;

  const { data } = await axios.get<GetChapterSessionsResponse>(url);

  return data;
};

/**
 * Request:    DELETE /api/v1/consumer/chapter/sessions/:id
 * Description: Delete a chapter's session
 */
export const deleteChapterSession = async (
  data: DeleteChapterSessionRequest,
) => {
  const url = `${PREFIX}/sessions/${data.id}`;

  const { data: responseData } =
    await axios.delete<DeleteChapterSessionResponse>(url);

  return responseData;
};

/**
 * Request:    GET /api/v1/consumer/chapter/notifications
 * Description: Get a chapter's notifications
 */
export const getChapterNotifications = async (
  data: GetNotificationsRequest,
) => {
  const url = `${PREFIX}/notifications`;

  const { data: responseData } = await axios.get<GetNotificationsResponse>(
    url,
    {
      params: data,
    },
  );

  return responseData;
};

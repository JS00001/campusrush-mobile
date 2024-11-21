import type {
  GetChapterStatisticsResponse,
  UpdateChapterRequest,
  UpdateChapterResponse,
  DeleteChapterResponse,
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

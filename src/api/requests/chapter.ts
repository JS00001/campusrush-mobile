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

import { axiosClient } from '@/providers/Axios';

const PREFIX = '/api/v1/consumer/chapter';

/**
 * Request:     GET /api/v1/consumer/chapter/statistics
 * Description: Get a chapter's statistics
 */
export const getChapterStatistics = async () => {
  const url = `${PREFIX}/statistics`;

  const { data } = await axiosClient.get(url);

  return data as GetChapterStatisticsResponse;
};

/**
 * Request:     PUT /api/v1/consumer/chapter/update
 * Description: Update a chapter
 */
export const updateChapter = async (data: UpdateChapterRequest) => {
  const url = `${PREFIX}/update`;

  const { data: responseData } = await axiosClient.put(url, data);

  return responseData as UpdateChapterResponse;
};

/**
 * Request:     DELETE /api/v1/consumer/chapter/delete
 * Description: Delete a chapter
 */
export const deleteChapter = async () => {
  const url = `${PREFIX}/delete`;

  const { data } = await axiosClient.delete(url);

  return data as DeleteChapterResponse;
};

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
  GetChapterStatisticsResponse,
  UpdateChapterRequest,
  UpdateChapterResponse,
  DeleteChapterResponse,
  GetChapterSessionsResponse,
  DeleteChapterSessionRequest,
  DeleteChapterSessionResponse,
} from '@/types';

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
 * Request:     PUT /api/v1/consumer/chapter
 * Description: Update a chapter
 */
export const updateChapter = async (data: UpdateChapterRequest) => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axiosClient.put(url, data);

  return responseData as UpdateChapterResponse;
};

/**
 * Request:     DELETE /api/v1/consumer/chapter
 * Description: Delete a chapter
 */
export const deleteChapter = async () => {
  const url = `${PREFIX}`;

  const { data } = await axiosClient.delete(url);

  return data as DeleteChapterResponse;
};

/**
 * Request:    GET /api/v1/consumer/chapter/sessions
 * Description: Get a chapter's sessions
 */
export const getChapterSessions = async () => {
  const url = `${PREFIX}/sessions`;

  const { data } = await axiosClient.get(url);

  return data as GetChapterSessionsResponse;
};

/**
 * Request:    DELETE /api/v1/consumer/chapter/sessions/:id
 * Description: Delete a chapter's session
 */
export const deleteChapterSession = async (
  data: DeleteChapterSessionRequest,
) => {
  const url = `${PREFIX}/sessions/${data.id}`;

  const { data: responseData } = await axiosClient.delete(url);

  return responseData as DeleteChapterSessionResponse;
};

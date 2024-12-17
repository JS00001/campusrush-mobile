/*
 * Created on Mon Dec 16 2024
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
  GetNotificationsRequest,
  GetNotificationsResponse,
  CreateChapterUserRequest,
  CreateChapterUserResponse,
  DeleteChapterUserRequest,
  DeleteChapterUserResponse,
  GetChapterUsersResponse,
  UpdateChapterUserRequest,
  UpdateChapterUserResponse,
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

/**
 * Request:     GET /api/v1/consumer/chapter/users
 * Description: Get a chapter's users
 */
export const getChapterUsers = async () => {
  const url = `${PREFIX}/users`;

  const { data: responseData } = await axios.get<GetChapterUsersResponse>(url);

  return responseData;
};

/**
 * Request:     POST /api/v1/consumer/chapter/users
 * Description: Create a chapter user
 */
export const createChapterUser = async (data: CreateChapterUserRequest) => {
  const url = `${PREFIX}/users`;

  const { data: responseData } = await axios.post<CreateChapterUserResponse>(
    url,
    data,
  );

  return responseData;
};

/**
 * Request:     PUT /api/v1/consumer/chapter/users/:id
 * Description: Update a chapter user
 */
export const updateChapterUser = async (data: UpdateChapterUserRequest) => {
  const url = `${PREFIX}/users/${data.id}`;

  const { data: responseData } = await axios.put<UpdateChapterUserResponse>(
    url,
    data,
  );

  return responseData;
};

/**
 * Request:     DELETE /api/v1/consumer/chapter/users/:id
 * Description: Delete a chapter user
 */
export const deleteChapterUser = async (data: DeleteChapterUserRequest) => {
  const url = `${PREFIX}/users/${data.id}`;

  const { data: responseData } =
    await axios.delete<DeleteChapterUserResponse>(url);

  return responseData;
};

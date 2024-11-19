/*
 * Created on Sat Sep 07 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import axios from '@/lib/axios';

import type {
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@/types';

const PREFIX = '/user';

/**
 * Request:     GET /api/v1/consumer/user
 * Description: Get the current user
 */
export const getUser = async () => {
  const url = `${PREFIX}`;

  const { data } = await axios.get<GetUserResponse>(url);

  return data;
};

/**
 * Request:     PUT /api/v1/consumer/user
 * Description: Update a user
 */
export const updateUser = async (data: UpdateUserRequest) => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axios.put<UpdateUserResponse>(url, data);

  return responseData;
};

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
  GetPnmsResponse,
  DeletePnmResponse,
  CreatePnmRequest,
  CreatePnmResponse,
  GetPnmRequest,
  GetPnmResponse,
  UpdatePnmRequest,
  UpdatePnmResponse,
  DeletePnmRequest,
} from '@/types';

import { axiosClient } from '@/providers/Axios';

const PREFIX = '/api/v1/consumer/pnms';

/**
 * Request:     GET /api/v1/consumer/pnms
 * Description: Get all PNMs
 */
export const getPnms = async () => {
  const url = `${PREFIX}`;

  const { data } = await axiosClient.get(url);

  return data as GetPnmsResponse;
};

/**
 * Request:     DELETE /api/v1/consumer/pnms
 * Description: Delete ALL PNMs
 */
export const deletePnms = async () => {
  const url = `${PREFIX}`;

  const { data } = await axiosClient.delete(url);

  return data as DeletePnmResponse;
};

/**
 * Request:     POST /api/v1/consumer/pnms
 * Description: Create a PNM
 */
export const createPnm = async (data: CreatePnmRequest) => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as CreatePnmResponse;
};

/**
 * Request:     GET /api/v1/consumer/pnms/:id
 * Description: Get a PNM
 */
export const getPnm = async (data: GetPnmRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const { data: responseData } = await axiosClient.get(url);

  return responseData as GetPnmResponse;
};

/**
 * Request:     PUT /api/v1/consumer/pnms/:id
 * Description: Update a PNM
 */
export const updatePnm = async (data: UpdatePnmRequest) => {
  const { id, ...rest } = data;
  const url = `${PREFIX}/${id}`;

  const { data: responseData } = await axiosClient.put(url, rest);

  return responseData as UpdatePnmResponse;
};

/**
 * Request:     DELETE /api/v1/consumer/pnms/:id
 * Description: Delete a PNM
 */
export const deletePnm = async (data: DeletePnmRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const { data: responseData } = await axiosClient.delete(url);

  return responseData as DeletePnmResponse;
};

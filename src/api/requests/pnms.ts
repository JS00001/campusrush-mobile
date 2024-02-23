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

const PREFIX = '/api/v1/consumer/pnms';

/**
 * Request:     GET /api/v1/consumer/pnms/list
 * Description: Get all PNMs
 */
export const getPnms = async () => {
  const url = `${PREFIX}/list`;

  const { data } = await axiosClient.get(url);

  return data as GetPnmsResponse;
};

/**
 * Request:     DELETE /api/v1/consumer/pnms/delete
 * Description: Delete ALL PNMs
 */
export const deletePnms = async () => {
  const url = `${PREFIX}/delete`;

  const { data } = await axiosClient.delete(url);

  return data as DeletePnmResponse;
};

/**
 * Request:     POST /api/v1/consumer/pnms/create
 * Description: Create a PNM
 */
export const createPnm = async (data: CreatePnmRequest) => {
  const url = `${PREFIX}/create`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as CreatePnmResponse;
};

/**
 * Request:     PUT /api/v1/consumer/pnms/update/:id
 * Description: Update a PNM
 */
export const updatePnm = async (data: UpdatePnmRequest) => {
  const { id, ...rest } = data;
  const url = `${PREFIX}/update/${id}`;

  const { data: responseData } = await axiosClient.put(url, rest);

  return responseData as UpdatePnmResponse;
};

/**
 * Request:     DELETE /api/v1/consumer/pnms/delete/:id
 * Description: Delete a PNM
 */
export const deletePnm = async (data: DeletePnmRequest) => {
  const url = `${PREFIX}/delete/${data.id}`;

  const { data: responseData } = await axiosClient.delete(url);

  return responseData as DeletePnmResponse;
};

/*
 * Created on Sat Sep 02 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { axiosClient } from '@/providers/Axios';

// Create a new axios client for this file
const pnmsAPIClient = axiosClient;
// The prefix for all routes in this file
const PREFIX = '/api/v1/pnms';

/**
 * GET /api/v1/pnms/list
 *
 * Returns
 * - data
 *  - pnms
 */
const getPnms = (data: GetPnmsInput): Promise<GetPnmsAPIResponse> => {
  return pnmsAPIClient.get(`${PREFIX}/list`, { params: data });
};

/**
 * GET /api/v1/pnms/list/:id
 *
 * Returns
 * - data
 *  - pnm
 */
const getPnm = (data: GetPnmInput): Promise<GetPnmAPIResponse> => {
  return pnmsAPIClient.get(`${PREFIX}/list/${data.id}`);
};

/**
 * POST /api/v1/pnms/create
 *
 * Returns
 * - data
 *  - pnm
 */
const createPnm = (data: CreatePnmInput): Promise<CreatePnmAPIResponse> => {
  return pnmsAPIClient.post(`${PREFIX}/create`, data);
};

/**
 * PUT /api/v1/pnms/update/:id
 *
 * Returns
 * - data
 *  - pnm
 */
const updatePnm = (data: UpdatePnmInput): Promise<UpdatePnmAPIResponse> => {
  return pnmsAPIClient.put(`${PREFIX}/update/${data.id}`, data);
};

/**
 * DELETE /api/v1/pnms/delete/:id
 *
 * Returns
 * - data
 */
const deletePnm = (data: DeletePnmInput): Promise<DeletePnmAPIResponse> => {
  return pnmsAPIClient.delete(`${PREFIX}/delete/${data.id}`);
};

/**
 * DELETE /api/v1/pnms/delete
 *
 * Returns
 * - data
 */
const deletePnms = (): Promise<DeletePnmsAPIResponse> => {
  return pnmsAPIClient.delete(`${PREFIX}/delete`);
};

export default {
  getPnm,
  getPnms,
  createPnm,
  updatePnm,
  deletePnm,
  deletePnms,
};

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

import { API_VERSION_URL } from '@/api/constants';

axiosClient.defaults.baseURL = API_VERSION_URL;

const pnmsAPIClient = axiosClient;

/**
 * GET /api/v1/pnms/list
 *
 * Returns
 * - data
 *  - pnms
 */
const getPnms = (data: GetPnmsInput): Promise<GetPnmsAPIResponse> => {
  return pnmsAPIClient.get('/pnms/list', { params: data });
};

export default {
  getPnms,
};

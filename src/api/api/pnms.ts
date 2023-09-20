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

export default {
  getPnms,
};

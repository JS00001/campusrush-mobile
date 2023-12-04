/*
 * Created on Sun Dec 03 2023
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
const externalAPIClient = axiosClient;
// The prefix for all routes in this file
const PREFIX = '/api/v1/external';

/**
 * GET /api/v1/external/version
 *
 * Returns
 * - data
 *  - version
 */
// prettier-ignore
const getVersion = (): Promise<GetVersionAPIResponse> => {
  return externalAPIClient.get(`${PREFIX}/version`);
};

export default {
  getVersion,
};

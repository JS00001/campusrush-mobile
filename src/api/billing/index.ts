/*
 * Created on Wed Nov 08 2023
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
const billingAPIClient = axiosClient;
// The prefix for all routes in this file
const PREFIX = '/billing/v1';

/**
 * GET /billing/v1/entitlements
 *
 * Returns
 * - data: EntitlementData
 */
const getEntitlements = (): Promise<GetEntitlementsAPIResponse> => {
  return billingAPIClient.get(`${PREFIX}/entitlements`);
};

export default {
  getEntitlements,
};

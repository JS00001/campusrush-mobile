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

const PREFIX = '/api/v1/consumer/billing';

/**
 * Request:     GET /api/v1/consumer/billing/entitlements
 * Description: Get all entitlements available/products
 */
export const getEntitlements = async () => {
  const url = `${PREFIX}/entitlements`;

  const { data } = await axiosClient.get(url);

  return data as GetEntitlementsResponse;
};

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

const PREFIX = '/api/v1/consumer/external';

/**
 * Request:     GET /api/v1/consumer/external/version
 * Description: Get the minimum required version for the app to use the API
 */
export const getVersion = async () => {
  const url = `${PREFIX}/version`;

  const { data } = await axiosClient.get(url);

  return data as GetVersionResponse;
};

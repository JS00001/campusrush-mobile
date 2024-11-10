/*
 * Created on Sat Nov 09 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type { GetMetadataResponse } from '@/types';

import axios from '@/lib/axios';

const PREFIX = '/external';

/**
 * Request:     GET /api/v1/consumer/external/metadata
 * Description: Get the metadata of the application
 */
export const getMetadata = async () => {
  const url = `${PREFIX}/metadata`;

  const { data } = await axios.get<GetMetadataResponse>(url);

  return data;
};

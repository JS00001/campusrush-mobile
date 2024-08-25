/*
 * Created on Sun Apr 14 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import axios from 'axios';

import type { GetWebsiteMetadataResponse } from '@/types';

const BASE_URL = 'https://api.dub.co/metatags?url=';

/**
 * Request:     GET /api/v1/consumer/admin/chapters
 * Description: Get all chapters
 */
export const getWebsiteMetadata = async (url: string) => {
  const { data } = await axios.get(`${BASE_URL}${url}`);

  return data as GetWebsiteMetadataResponse;
};

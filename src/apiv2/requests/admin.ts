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

import { axiosClient } from '@/providers/Axios2';

const PREFIX = '/api/v1/consumer/admin';

/**
 * Request:     GET /api/v1/consumer/admin/chapters
 * Description: Get all chapters
 */
export const getAdminChapters = async () => {
  const url = `${PREFIX}/chapters`;

  const { data } = await axiosClient.get(url);

  return data as GetAdminChaptersResponse;
};

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

import type { UploadFileResponse } from '@/types';

import { axiosClient } from '@/providers/Axios';

const PREFIX = '/api/v1/consumer/upload';

/**
 * Request:     POST /api/v1/consumer/upload
 * Description: Upload an attachment
 */
export const uploadFile = async (data: FormData) => {
  const url = `${PREFIX}/`;

  const { data: responseData } = await axiosClient.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return responseData as UploadFileResponse;
};

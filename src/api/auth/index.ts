/*
 * Created on Fri Aug 11 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import axios from 'axios';

import { BASE_URL } from '@/api/constants';

const authAPIClient = axios.create({
  baseURL: `${BASE_URL}/api/v1/consumer/auth`,
});

/**
 * GET /api/v1/consumer/auth/chapter
 *
 * Returns
 * - data
 *  - chapter
 */
const getChapter = (data: GetChapterInput): Promise<GetChapterAPIResponse> => {
  return authAPIClient.get('/chapter', {
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
  });
};

/**
 * POST /api/v1/consumer/auth/login
 *
 * Returns
 * - data
 *  - chapter
 *  - accessToken
 *  - refreshToken
 */
const loginAsChapter = (
  data: LoginAsChapterInput,
): Promise<LoginAsChapterAPIResponse> => {
  return authAPIClient.post('/login', data);
};

/**
 * POST /api/v1/consumer/auth/register
 *
 * Returns
 * - data
 *  - chapter
 *  - accessToken
 *  - refreshToken
 */
const registerAsChapter = (
  data: RegisterAsChapterInput,
): Promise<RegisterAsChapterAPIResponse> => {
  return authAPIClient.post('/register', data);
};

/**
 * POST /api/v1/consumer/auth/chapters/check
 *
 * Returns
 * - data
 *  - exists
 */
const checkChapterExists = (
  data: CheckChapterExistsInput,
): Promise<CheckChapterExistsAPIResponse> => {
  return authAPIClient.post('/chapters/check', data);
};

/**
 * POST /api/v1/consumer/auth/emails/check
 *
 * Returns
 * - data
 *  - exists
 */
const checkEmailExists = (
  data: CheckEmailExistsInput,
): Promise<CheckEmailExistsAPIResponse> => {
  return authAPIClient.post('/emails/check', data);
};

/**
 * POST /api/v1/consumer/auth/verification/verify
 *
 * Returns
 * - data
 *  - chapter
 */
const verifyChapter = (
  data: VerifyChapterInput,
): Promise<VerifyChapterAPIResponse> => {
  return authAPIClient.post('/verification/verify', data, {
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
  });
};

/**
 * POST /api/v1/consumer/auth/verification/resend
 *
 * Returns
 * - data
 *  - message
 */
const resendVerification = (
  data: ResendVerificationInput,
): Promise<ResendVerificationAPIResponse> => {
  return authAPIClient.post(
    '/verification/resend',
    {},
    {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    },
  );
};

/**
 * POST /api/v1/consumer/auth/refresh
 *
 * Returns
 * - data
 *  - accessToken
 */
const refreshAccessToken = (
  data: RefreshAccessTokenInput,
): Promise<RefreshAccessTokenAPIResponse> => {
  return authAPIClient.post(
    '/refresh',
    {},
    {
      headers: {
        Authorization: `Bearer ${data.refreshToken}`,
      },
    },
  );
};

/**
 * POST /api/v1/consumer/auth/logout
 *
 * Returns
 * - data
 */
const logout = (data: LogoutInput): Promise<LogoutAPIResponse> => {
  return authAPIClient.post(
    '/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    },
  );
};

export default {
  getChapter,

  loginAsChapter,
  registerAsChapter,

  checkChapterExists,
  checkEmailExists,

  verifyChapter,
  resendVerification,

  refreshAccessToken,
  logout,
};

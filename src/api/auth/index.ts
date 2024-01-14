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
  baseURL: `${BASE_URL}/auth/v1`,
});

/**
 * GET /auth/v1/chapter
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
 * POST /auth/v1/login/as/chapter
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
  return authAPIClient.post('/login/as/chapter', data);
};

/**
 * POST /auth/v1/register/as/chapter
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
  return authAPIClient.post('/register/as/chapter', data);
};

/**
 * POST /auth/v1/chapters/check
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
 * POST /auth/v1/emails/check
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
 * POST /auth/v1/verification/verify
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
 * POST /auth/v1/verification/resend
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
 * POST /auth/v1/refresh
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
 * POST /auth/v1/logout
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

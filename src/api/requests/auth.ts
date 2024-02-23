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

const PREFIX = '/api/v1/consumer/auth';

/**
 * Request:     GET /api/v1/consumer/auth/chapter
 * Description: Get the current chapter
 */
export const getChapter = async () => {
  const url = `${PREFIX}/chapter`;

  const { data } = await axiosClient.get(url);

  return data as GetChapterResponse;
};

/**
 * Request:     POST /api/v1/consumer/auth/login
 * Description: Login to a chapters account
 */
export const login = async (data: LoginRequest) => {
  const url = `${PREFIX}/login`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as LoginResponse;
};

/**
 * Request:     POST /api/v1/consumer/auth/register
 * Description: Register a new user
 */
export const register = async (data: RegisterRequest) => {
  const url = `${PREFIX}/register`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as RegisterResponse;
};

/**
 * Request:     POST /api/v1/consumer/auth/emails/check
 * Description: Check if an email is already in use
 */
export const checkEmail = async (data: CheckEmailRequest) => {
  const url = `${PREFIX}/emails/check`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as CheckEmailResponse;
};

/**
 * Request:     POST /api/v1/consumer/auth/verification/verify
 * Description: Verify an email
 */
export const verifyChapter = async (data: VerifyChapterInput) => {
  const url = `${PREFIX}/verification/verify`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as VerifyChapterResponse;
};

/**
 * Request:     POST /api/v1/consumer/auth/verification/resend
 * Description: Resend a verification email
 */
export const resendVerification = async () => {
  const url = `${PREFIX}/verification/resend`;

  const { data: responseData } = await axiosClient.post(url);

  return responseData as ResendVerificationResponse;
};

/**
 * Request:     POST /api/v1/consumer/auth/refresh
 * Description: Refresh the access token
 */
export const refresh = async (data: RefreshAccessTokenRequest) => {
  const url = `${PREFIX}/refresh`;

  const headers = {
    Authorization: `Bearer ${data.refreshToken}`,
  };

  const { data: responseData } = await axiosClient.post(url, undefined, {
    headers,
  });

  return responseData as RefreshAccessTokenResponse;
};

/**
 * Request:     POST /api/v1/consumer/auth/logout
 * Description: Logout of the current session
 */
export const logout = async () => {
  const url = `${PREFIX}/logout`;

  const { data: responseData } = await axiosClient.post(url);

  return responseData as LogoutResponse;
};

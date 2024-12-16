/*
 * Created on Mon Dec 16 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  CheckEmailRequest,
  CheckEmailResponse,
  VerifyChapterRequest,
  VerifyChapterResponse,
  ResendVerificationResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetChapterInviteRequest,
  GetChapterInviteResponse,
  RegisterChapterInviteRequest,
  RegisterChapterInviteResponse,
} from '@/types';

import axios from '@/lib/axios';

const PREFIX = '/auth';

/**
 * Request:     POST /api/v1/consumer/auth/login
 * Description: Login to a chapters account
 */
export const login = async (data: LoginRequest) => {
  const url = `${PREFIX}/login`;

  const { data: responseData } = await axios.post<LoginResponse>(url, data);

  return responseData;
};

/**
 * Request:     POST /api/v1/consumer/auth/register
 * Description: Register a new user
 */
export const register = async (data: RegisterRequest) => {
  const url = `${PREFIX}/register`;

  const { data: responseData } = await axios.post<RegisterResponse>(url, data);

  return responseData;
};

/**
 * Request:     GET /api/v1/consumer/auth/email-exists
 * Description: Check if an email is already in use
 */
export const checkEmail = async (data: CheckEmailRequest) => {
  const url = `${PREFIX}/email-exists?email=${data.email}`;

  const { data: responseData } = await axios.get<CheckEmailResponse>(url);

  return responseData;
};

/**
 * Request:     POST /api/v1/consumer/auth/verify
 * Description: Verify an email
 */
export const verifyChapter = async (data: VerifyChapterRequest) => {
  const url = `${PREFIX}/verify`;

  const { data: responseData } = await axios.post<VerifyChapterResponse>(
    url,
    data,
  );

  return responseData;
};

/**
 * Request:     POST /api/v1/consumer/auth/resend-verification
 * Description: Resend a verification email
 */
export const resendVerification = async () => {
  const url = `${PREFIX}/resend-verification`;

  const { data: responseData } =
    await axios.post<ResendVerificationResponse>(url);

  return responseData;
};

/**
 * Request:     POST /api/v1/consumer/auth/reset-password
 * Description: Request a password reset
 */
export const resetPassword = async (data: ResetPasswordRequest) => {
  const url = `${PREFIX}/reset-password`;

  const { data: responseData } = await axios.post<ResetPasswordResponse>(
    url,
    data,
  );

  return responseData;
};

/**
 * Request:     POST /api/v1/consumer/auth/change-password
 * Description: Change the password using a reset code
 */
export const changePassword = async (data: ChangePasswordRequest) => {
  const url = `${PREFIX}/change-password`;

  const { data: responseData } = await axios.post<ChangePasswordResponse>(
    url,
    data,
  );

  return responseData;
};

/**
 * Request:    POST /api/v1/consumer/auth/invite/:id
 * Description: Accept an invitation
 */
export const registerChapterInvite = async (
  data: RegisterChapterInviteRequest,
) => {
  const url = `${PREFIX}/invite/${data.id}`;

  const { data: responseData } =
    await axios.post<RegisterChapterInviteResponse>(url, data);

  return responseData;
};

/**
 * Request:     GET /api/v1/consumer/auth/invite/:id
 * Description: Get the invitation details
 */
export const getChapterInvite = async (data: GetChapterInviteRequest) => {
  const url = `${PREFIX}/invite/${data.id}`;

  const { data: responseData } = await axios.get<GetChapterInviteResponse>(url);

  return responseData;
};

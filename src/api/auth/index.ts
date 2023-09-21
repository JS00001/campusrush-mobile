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
 * GET /auth/v1/organizations/list
 *
 * Returns
 * - data
 *  - organizations
 *  - schools
 */
const getOrganizations = (): Promise<GetOrganizationsAPIResponse> => {
  return authAPIClient.get('/organizations/list');
};

/**
 * GET /auth/v1/organization
 *
 * Returns
 * - data
 *  - organization
 */
const getOrganization = (
  data: GetOrganizationInput,
): Promise<GetOrganizationAPIResponse> => {
  return authAPIClient.get('/organization', {
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
  });
};

/**
 * POST /auth/v1/login/as/organization
 *
 * Returns
 * - data
 *  - organization
 *  - accessToken
 *  - refreshToken
 */
const loginAsOrganization = (
  data: LoginAsOrganizationInput,
): Promise<LoginAsOrganizationAPIResponse> => {
  return authAPIClient.post('/login/as/organization', data);
};

/**
 * POST /auth/v1/register/as/organization
 *
 * Returns
 * - data
 *  - organization
 *  - accessToken
 *  - refreshToken
 */
const registerAsOrganization = (
  data: RegisterAsOrganizationInput,
): Promise<RegisterAsOrganizationAPIResponse> => {
  return authAPIClient.post('/register/as/organization', data);
};

/**
 * POST /auth/v1/organizations/check
 *
 * Returns
 * - data
 *  - exists
 */
const checkOrganizationExists = (
  data: CheckOrganizationExistsInput,
): Promise<CheckOrganizationExistsAPIResponse> => {
  return authAPIClient.post('/organizations/check', data);
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
 *  - organization
 */
const verifyOrganization = (
  data: VerifyOrganizationInput,
): Promise<VerifyOrganizationAPIResponse> => {
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
  getOrganizations,
  getOrganization,

  loginAsOrganization,
  registerAsOrganization,

  checkOrganizationExists,
  checkEmailExists,

  verifyOrganization,
  resendVerification,

  refreshAccessToken,
  logout,
};

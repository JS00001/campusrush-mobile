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

import { AUTH_VERSION_URL } from '@/api/constants';

const authAPIClient = axios.create({
  baseURL: AUTH_VERSION_URL,
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

export default {
  getOrganizations,

  loginAsOrganization,
};

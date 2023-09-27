/*
 * Created on Sat Sep 02 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { axiosClient } from '@/providers/Axios';

// Create a new axios client for this file
const adminAPIClient = axiosClient;
// Set the Prefix URL for this client
const PREFIX = '/admin/v1';

/**
 * GET /admin/v1/statistics
 *
 * Returns
 * - data
 *   - numOrganizations
 *   - numPayingOrganizations
 */
const getStatistics = (): Promise<GetAdminStatisticsAPIResponse> => {
  return adminAPIClient.get(`${PREFIX}/statistics`);
};

/**
 * GET /admin/v1/organizations
 *
 * Returns
 * - data
 *  - organizations
 */
const getOrganizations = (): Promise<GetAdminOrganizationsAPIResponse> => {
  return adminAPIClient.get(`${PREFIX}/organizations`);
};

/**
 * GET /admin/v1/organization/:id
 *
 * Returns
 * - data
 *  - organization
 */
const getOrganization = (
  data: GetAdminOrganizationInput,
): Promise<GetAdminOrganizationAPIResponse> => {
  return adminAPIClient.get(`${PREFIX}/organization/${data.id}`);
};

/**
 * POST /admin/v1/upgrade/:id
 *
 * Returns
 * - data
 *  - organization
 */
const upgradeOrganization = (
  data: UpgradeOrganizationInput,
): Promise<UpgradeOrganizationAPIResponse> => {
  return adminAPIClient.post(`${PREFIX}/upgrade/${data.id}`, data);
};

/**
 * POST /admin/v1/downgrade/:id
 *
 * Returns
 * - data
 *  - organization
 */
const downgradeOrganization = (
  data: DowngradeOrganizationInput,
): Promise<DowngradeOrganizationAPIResponse> => {
  return adminAPIClient.post(`${PREFIX}/downgrade/${data.id}`);
};

export default {
  getStatistics,
  getOrganizations,
  getOrganization,

  upgradeOrganization,
  downgradeOrganization,
};

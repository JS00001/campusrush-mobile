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

import { axiosClient } from '@/providers/Axios';

// Create a new axios client for this file
const organizationAPIClient = axiosClient;
// The prefix for all routes in this file
const PREFIX = '/api/v1/organization';

/**
 * GET /api/v1/organization/statistics
 *
 * Returns
 * - data
 *  - pnms
 *  - starredPnms
 *  - recentPnms
 */
const getOrganizationStatistics =
  (): Promise<GetOrganizationStatisticsAPIResponse> => {
    return organizationAPIClient.get(`${PREFIX}/statistics`);
  };

/**
 * PUT /api/v1/organization/update
 *
 * Returns
 * - data
 *  - organization
 */
const updateOrganization = (
  data: UpdateOrganizationInput,
): Promise<UpdateOrganizationAPIResponse> => {
  return organizationAPIClient.put(`${PREFIX}/update`, data);
};

/**
 * DELETE /api/v1/organization/delete
 *
 * Returns
 * - data
 *   - success
 */
const deleteOrganization = (): Promise<DeleteOrganizationAPIResponse> => {
  return organizationAPIClient.delete(`${PREFIX}/delete`);
};

export default {
  getOrganizationStatistics,
  updateOrganization,
  deleteOrganization,
};

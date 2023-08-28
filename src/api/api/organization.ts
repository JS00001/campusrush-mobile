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

import { API_VERSION_URL } from '@/api/constants';

axiosClient.defaults.baseURL = API_VERSION_URL + '/organization';

const organizationAPIClient = axiosClient;

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
  return organizationAPIClient.put('/update', data);
};

export default {
  updateOrganization,
};

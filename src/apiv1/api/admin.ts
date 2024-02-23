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

import { axiosClient } from '@/providers/Axiosv1';

// Create a new axios client for this file
const adminAPIClient = axiosClient;
// Set the Prefix URL for this client
const PREFIX = '/api/v1/consumer/admin';

/**
 * GET /api/v1/consumer/admin/statistics
 *
 * Returns
 * - data
 *   - numChapters
 *   - numPayingChapters
 */
const getStatistics = (): Promise<GetAdminStatisticsAPIResponse> => {
  return adminAPIClient.get(`${PREFIX}/statistics`);
};

/**
 * GET /api/v1/consumer/admin/chapters
 *
 * Returns
 * - data
 *  - chapters
 */
const getChapters = (): Promise<GetAdminChaptersAPIResponse> => {
  return adminAPIClient.get(`${PREFIX}/chapters`);
};

/**
 * GET /api/v1/consumer/admin/chapter/:id
 *
 * Returns
 * - data
 *  - chapter
 */
const getChapter = (
  data: GetAdminChapterInput,
): Promise<GetAdminChapterAPIResponse> => {
  return adminAPIClient.get(`${PREFIX}/chapter/${data.id}`);
};

/**
 * POST /api/v1/consumer/admin/upgrade/:id
 *
 * Returns
 * - data
 *  - chapter
 */
const upgradeChapter = (
  data: UpgradeChapterInput,
): Promise<UpgradeChapterAPIResponse> => {
  return adminAPIClient.post(`${PREFIX}/upgrade/${data.id}`, data);
};

/**
 * POST /api/v1/consumer/admin/downgrade/:id
 *
 * Returns
 * - data
 *  - chapter
 */
const downgradeChapter = (
  data: DowngradeChapterInput,
): Promise<DowngradeChapterAPIResponse> => {
  return adminAPIClient.post(`${PREFIX}/downgrade/${data.id}`);
};

export default {
  getStatistics,
  getChapters,
  getChapter,

  upgradeChapter,
  downgradeChapter,
};

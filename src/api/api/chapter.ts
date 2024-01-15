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
const chapterAPIClient = axiosClient;
// The prefix for all routes in this file
const PREFIX = '/api/v1/consumer/chapter';

/**
 * GET /api/v1/chapter/statistics
 *
 * Returns
 * - data
 *  - pnms
 *  - starredPnms
 *  - recentPnms
 */
const getChapterStatistics = (): Promise<GetChapterStatisticsAPIResponse> => {
  return chapterAPIClient.get(`${PREFIX}/statistics`);
};

/**
 * PUT /api/v1/chapter/update
 *
 * Returns
 * - data
 *  - chapter
 */
const updateChapter = (
  data: UpdateChapterInput,
): Promise<UpdateChapterAPIResponse> => {
  return chapterAPIClient.put(`${PREFIX}/update`, data);
};

/**
 * DELETE /api/v1/chapter/delete
 *
 * Returns
 * - data
 *   - success
 */
const deleteChapter = (): Promise<DeleteChapterAPIResponse> => {
  return chapterAPIClient.delete(`${PREFIX}/delete`);
};

export default {
  getChapterStatistics,
  updateChapter,
  deleteChapter,
};

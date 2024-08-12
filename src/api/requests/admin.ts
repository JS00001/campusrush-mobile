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

const PREFIX = '/api/v1/consumer/admin';

/**
 * Request:     GET /api/v1/consumer/admin/chapters
 * Description: Get all chapters
 */
export const getAdminChapters = async () => {
  const url = `${PREFIX}/chapters`;

  const { data } = await axiosClient.get(url);

  return data as GetAdminChaptersResponse;
};

/**
 * Request:     GET /api/v1/consumer/admin/chapters/:id
 * Description: Get a chapter by id
 */
export const getAdminChapter = async (data: GetAdminChapterRequest) => {
  const url = `${PREFIX}/chapters/${data.id}`;

  const { data: responseData } = await axiosClient.get(url);

  return responseData as GetAdminChapterResponse;
};

/**
 * Request:     GET /api/v1/consumer/admin/chapters/:id/entitlements
 * Description: Get a chapter's entitlements
 */
export const getAdminChapterEntitlements = async (
  data: GetAdminChapterEntitlementsRequest,
) => {
  const url = `${PREFIX}/chapters/${data.id}/entitlements`;

  const { data: responseData } = await axiosClient.get(url);

  return responseData as GetAdminChapterEntitlementsResponse;
};

/**
 * Request:     POST /api/v1/consumer/admin/chapters/:id/entitlements
 * Description: Add entitlements to a chapter
 */
export const grantAdminChapterEntitlement = async (
  data: GrantAdminChapterEntitlementRequest,
) => {
  const url = `${PREFIX}/chapters/${data.id}/entitlements`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as GrantAdminChapterEntitlementsResponse;
};

/**
 * Request:     DELETE /api/v1/consumer/admin/chapter/:id/entitlements
 * Description: Remove entitlements from a chapter
 */
export const revokeAdminChapterEntitlement = async (
  data: RevokeAdminChapterEntitlementRequest,
) => {
  const url = `${PREFIX}/chapters/${data.id}/entitlements`;

  const { data: responseData } = await axiosClient.delete(url, { data });

  return responseData as RevokeAdminChapterEntitlementsResponse;
};

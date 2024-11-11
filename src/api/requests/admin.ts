import type {
  GetAdminChaptersResponse,
  GetAdminChapterRequest,
  GetAdminChapterResponse,
  GetAdminChapterEntitlementsRequest,
  GetAdminChapterEntitlementsResponse,
  GrantAdminChapterEntitlementRequest,
  GrantAdminChapterEntitlementsResponse,
  RevokeAdminChapterEntitlementRequest,
  RevokeAdminChapterEntitlementsResponse,
  SendChapterNotificationRequest,
  SendChapterNotificationResponse,
  GetAdminStatisticsResponse,
  GetViolationsResponse,
} from '@/types';

import axios from '@/lib/axios';

const PREFIX = '/admin';

/**
 * Request:     GET /api/v1/consumer/admin/chapters
 * Description: Get all chapters
 */
export const getAdminChapters = async () => {
  const url = `${PREFIX}/chapters`;

  const { data } = await axios.get<GetAdminChaptersResponse>(url);

  return data;
};

/**
 * Request:     GET /api/v1/consumer/admin/chapters/:id
 * Description: Get a chapter by id
 */
export const getAdminChapter = async (data: GetAdminChapterRequest) => {
  const url = `${PREFIX}/chapters/${data.id}`;

  const { data: responseData } = await axios.get<GetAdminChapterResponse>(url);

  return responseData;
};

/**
 * Request:     GET /api/v1/consumer/admin/chapters/:id/entitlements
 * Description: Get a chapter's entitlements
 */
export const getAdminChapterEntitlements = async (
  data: GetAdminChapterEntitlementsRequest,
) => {
  const url = `${PREFIX}/chapters/${data.id}/entitlements`;

  const { data: responseData } =
    await axios.get<GetAdminChapterEntitlementsResponse>(url);

  return responseData;
};

/**
 * Request:     POST /api/v1/consumer/admin/chapters/:id/entitlements
 * Description: Add entitlements to a chapter
 */
export const grantAdminChapterEntitlement = async (
  data: GrantAdminChapterEntitlementRequest,
) => {
  const url = `${PREFIX}/chapters/${data.id}/entitlements`;

  const { data: responseData } =
    await axios.put<GrantAdminChapterEntitlementsResponse>(url, data);

  return responseData;
};

/**
 * Request:     DELETE /api/v1/consumer/admin/chapter/:id/entitlements
 * Description: Remove entitlements from a chapter
 */
export const revokeAdminChapterEntitlement = async (
  data: RevokeAdminChapterEntitlementRequest,
) => {
  const url = `${PREFIX}/chapters/${data.id}/entitlements`;

  const { data: responseData } =
    await axios.delete<RevokeAdminChapterEntitlementsResponse>(url, { data });

  return responseData;
};

/**
 * Request:     POST /api/v1/consumer/admin/chapters/:id/notification
 * Description: Send a notification to a chapter
 */
export const sendChapterNotification = async (
  data: SendChapterNotificationRequest,
) => {
  const url = `${PREFIX}/chapters/${data.id}/notification`;

  const { data: responseData } =
    await axios.post<SendChapterNotificationResponse>(url, data);

  return responseData;
};

/**
 * Request:     GET /api/v1/consumer/admin/statistics
 * Description: Get statistics for all chapters
 */
export const getAdminStatistics = async () => {
  const url = `${PREFIX}/statistics`;

  const { data } = await axios.get<GetAdminStatisticsResponse>(url);

  return data;
};

/**
 * Request:     GET /api/v1/consumer/admin/violations
 * Description: Get all violations
 */
export const getViolations = async () => {
  const url = `${PREFIX}/violations`;

  const { data } = await axios.get<GetViolationsResponse>(url);

  return data;
};

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

import { useMutation } from '@tanstack/react-query';

import type {
  GrantAdminChapterEntitlementRequest,
  RevokeAdminChapterEntitlementRequest,
  SendChapterNotificationRequest,
} from '@/types';

import {
  grantAdminChapterEntitlement,
  revokeAdminChapterEntitlement,
  sendChapterNotification,
} from '@/api';

export const useGrantAdminChapterEntitlement = () => {
  return useMutation({
    mutationFn: (data: GrantAdminChapterEntitlementRequest) => {
      return grantAdminChapterEntitlement(data);
    },
  });
};

export const useRevokeAdminChapterEntitlement = () => {
  return useMutation({
    mutationFn: (data: RevokeAdminChapterEntitlementRequest) => {
      return revokeAdminChapterEntitlement(data);
    },
  });
};

export const useSendChapterNotification = () => {
  return useMutation({
    mutationFn: (data: SendChapterNotificationRequest) => {
      return sendChapterNotification(data);
    },
  });
};

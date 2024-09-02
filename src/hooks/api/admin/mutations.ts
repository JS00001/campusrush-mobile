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
    mutationFn: async (data: GrantAdminChapterEntitlementRequest) => {
      const response = await grantAdminChapterEntitlement(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useRevokeAdminChapterEntitlement = () => {
  return useMutation({
    mutationFn: (data: RevokeAdminChapterEntitlementRequest) => {
      const response = revokeAdminChapterEntitlement(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useSendChapterNotification = () => {
  return useMutation({
    mutationFn: (data: SendChapterNotificationRequest) => {
      const response = sendChapterNotification(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

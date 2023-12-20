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

interface LoginAsOrganizationInput {
  email: string;
  password: string;
}

interface RegisterAsOrganizationInput {
  name: string;
  school: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface CheckOrganizationExistsInput {
  school: string;
  organization: string;
}

interface CheckEmailExistsInput {
  email: string;
}

interface VerifyOrganizationInput {
  accessToken?: string;
  code: string;
}

interface ResendVerificationInput {
  accessToken?: string;
}

interface GetOrganizationInput {
  accessToken?: string;
}

interface RefreshAccessTokenInput {
  refreshToken?: string;
}

interface LogoutInput {
  accessToken: string;
}

interface UpdateOrganizationInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  notificationPushToken?: string;
  notificationsEnabled?: boolean;
}

interface GetAdminOrganizationInput {
  id: string;
}

interface UpgradeOrganizationInput {
  id: string;
  entitlements: string[];
}

interface DowngradeOrganizationInput {
  id: string;
}

interface GetConversationInput {
  offset: number;
  pnmId: string;
}

interface FocusConversationInput {
  pnmId: string;
}

interface GetConversationsInput {
  offset: number;
}

interface SendMassMessageInput {
  pnms: string[];
  message: string;
}

interface SendDirectMessageInput {
  pnm: string;
  message: string;
}

interface CreatePnmInput {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  classification?: string;
  instagram?: string;
  snapchat?: string;
}

interface UpdatePnmInput {
  id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  classification?: string;
  instagram?: string;
  snapchat?: string;
  starred?: boolean;
}

interface DeletePnmInput {
  id: string;
}

interface GetPnmInput {
  id: string;
}

interface GetEventsInput {
  offset: number;
}

interface CreateEventInput {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
}

interface UpdateEventInput {
  id: string;
  title?: string;
  description?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
}

interface DeleteEventInput {
  id: string;
}

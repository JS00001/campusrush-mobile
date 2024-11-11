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

import type { IconType } from '@/ui/Icon';

export interface LoginRequest {
  /** The chapter's email */
  email: string;
  /** The chapter's password */
  password: string;
}

export interface RegisterRequest {
  /** The chapter's name */
  name: string;
  /** The school the chapter is associated with */
  school: string;
  /** The chapter leader's first name */
  firstName: string;
  /** The chapter leader's last name */
  lastName: string;
  /** The chapter leader's email */
  email: string;
  /** The chapter leader's password */
  password: string;
  /** Confirming the chapter leader's password */
  confirmPassword: string;
}

export interface CheckEmailRequest {
  /** The email to check for existence */
  email: string;
}

export interface VerifyChapterRequest {
  /** Access token for chapter verification */
  accessToken?: string;
  /** Verification code for the chapter */
  code: string;
}

export interface RefreshAccessTokenRequest {
  /** Refresh token for token refreshing */
  refreshToken?: string;
}

export interface UpdateChapterRequest {
  /** Updated first name for the chapter leader */
  firstName?: string;
  /** Updated last name for the chapter leader */
  lastName?: string;
  /** Updated email for the chapter leader */
  email?: string;
  /** Current password for security verification */
  currentPassword?: string;
  /** New password for updating the chapter leader's password */
  newPassword?: string;
  /** Confirming the new password */
  confirmNewPassword?: string;
  /** Push notification token for notifications */
  notificationPushToken?: string;
  /** Flag indicating if notifications are enabled */
  notificationsEnabled?: boolean;
  /** Whether link sharing is enabled */
  linkSharingEnabled?: boolean;
}

export interface GetConversationRequest {
  /** Offset for retrieving conversation */
  offset: number;
  /** ID of the potential new member (PNM) for conversation retrieval */
  pnmId: string;
}

export interface FocusConversationRequest {
  /** ID of the potential new member (PNM) for focusing conversation */
  pnmId: string;
}

export interface GetConversationsRequest {
  /** Offset for retrieving conversations */
  offset: number;
}

export interface SendMassMessageRequest {
  /** List of PNM IDs to send mass message */
  pnms: string[];
  /** Message content for mass messaging */
  message?: string;
  /** Attachments for the message */
  attachments: string[];
}

export interface SendDirectMessageRequest {
  /** ID of the potential new member (PNM) for direct messaging */
  pnm: string;
  /** Message content for direct messaging */
  message?: string;
  /** Attachments for the message */
  attachments: string[];
}

export interface CreatePnmRequest {
  /** First name of the potential new member (PNM) */
  firstName: string;
  /** Last name of the potential new member (PNM) */
  lastName: string;
  /** Phone number of the potential new member (PNM) */
  phoneNumber: string;
  /** Tag(s) associated with the potential new member (PNM) */
  tags?: string[];
  /** Instagram handle of the potential new member (PNM) */
  instagram?: string;
  /** Snapchat handle of the potential new member (PNM) */
  snapchat?: string;
}

export interface UpdatePnmRequest {
  /** ID of the potential new member (PNM) to be updated */
  id: string;
  /** Updated first name of the potential new member (PNM) */
  firstName?: string;
  /** Updated last name of the potential new member (PNM) */
  lastName?: string;
  /** Updated phone number of the potential new member (PNM) */
  phoneNumber?: string;
  /** Updated tag(s) associated with the potential new member (PNM) */
  tags?: string[];
  /** Updated Instagram handle of the potential new member (PNM) */
  instagram?: string;
  /** Updated Snapchat handle of the potential new member (PNM) */
  snapchat?: string;
  /** Flag indicating if the PNM is starred */
  starred?: boolean;
  /** Updated avatar of the potential new member (PNM) */
  avatar?: string;
}

export interface DeletePnmRequest {
  /** ID of the potential new member (PNM) to be deleted */
  id: string;
}

export interface CreateEventRequest {
  /** Title of the event to be created */
  title: string;
  /** Description of the event */
  description: string;
  /** Location of the event */
  location: string;
  /** Start date of the event */
  startDate: string;
  /** End date of the event */
  endDate: string;
}

export interface UpdateEventRequest {
  /** ID of the event to be updated */
  id: string;
  /** Updated title of the event */
  title: string;
  /** Updated description of the event */
  description: string;
  /** Updated location of the event */
  location: string;
  /** Updated start date of the event */
  startDate: string;
  /** Updated end date of the event */
  endDate: string;
}

export interface DeleteEventRequest {
  /** ID of the event to be deleted */
  id: string;
}

export interface GetPnmRequest {
  /** The ID of the potential new member (PNM) to be retrieved */
  id: string;
}

export interface GetEventRequest {
  /** The ID of the event to be retrieved */
  id: string;
}

export interface GetAdminChapterRequest {
  /** The ID of the chapter to be retrieved */
  id: string;
}

export interface GetAdminChapterEntitlementsRequest {
  /** The ID of the chapter to retrieve entitlements */
  id: string;
}

export interface GrantAdminChapterEntitlementRequest {
  /** The ID of the chapter to grant entitlements */
  id: string;
  /** The entitlement ID to grant */
  entitlementId: string;
  /** When the grant should expire */
  expires: number;
}

export interface RevokeAdminChapterEntitlementRequest {
  /** The ID of the chapter to revoke entitlements */
  id: string;
  /** The entitlement ID to revoke */
  entitlementId: string;
}

export interface DeleteChapterSessionRequest {
  /** The ID of the session to be deleted */
  id: string;
}

export interface ResetPasswordRequest {
  /** The email of the chapter to reset the password */
  email: string;
}

export interface ChangePasswordRequest {
  /** The email of the chapter to change the password */
  email: string;
  /** The reset code for changing the password */
  code: string;
  /** The new password for the chapter */
  password: string;
}

export interface SendChapterNotificationRequest {
  /** The id of the chapter to send the notification to */
  id: string;
  /** The title of the notification */
  title: string;
  /** The message of the notification */
  message: string;
  /** The icon for the notification */
  icon?: IconType;
  /** The color of the icon for the notification */
  iconColor?: string;
  /** Whether to send in test mode (to yourself) or not */
  testMode?: boolean;
}

export interface GetNotificationsRequest {
  /** Offset for retrieving notifications */
  offset: number;
}

export interface DeletePnmsRequest {
  /** Array of IDs of the potential new members (PNMs) to be deleted */
  pnms?: string[];
}

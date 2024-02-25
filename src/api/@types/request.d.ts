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

interface LoginRequest {
  /**
   * The chapter's email
   */
  email: string;
  /**
   * The chapter's password
   */
  password: string;
}

interface RegisterRequest {
  /**
   * The chapter's name
   */
  name: string;
  /**
   * The school the chapter is associated with
   */
  school: string;
  /**
   * The chapter leader's first name
   */
  firstName: string;
  /**
   * The chapter leader's last name
   */
  lastName: string;
  /**
   * The chapter leader's email
   */
  email: string;
  /**
   * The chapter leader's password
   */
  password: string;
  /**
   * Confirming the chapter leader's password
   */
  confirmPassword: string;
}

interface CheckEmailRequest {
  /**
   * The email to check for existence
   */
  email: string;
}

interface VerifyChapterRequest {
  /**
   * Access token for chapter verification
   */
  accessToken?: string;
  /**
   * Verification code for the chapter
   */
  code: string;
}

interface RefreshAccessTokenRequest {
  /**
   * Refresh token for token refreshing
   */
  refreshToken?: string;
}

interface UpdateChapterRequest {
  /**
   * Updated first name for the chapter leader
   */
  firstName?: string;
  /**
   * Updated last name for the chapter leader
   */
  lastName?: string;
  /**
   * Updated email for the chapter leader
   */
  email?: string;
  /**
   * Current password for security verification
   */
  currentPassword?: string;
  /**
   * New password for updating the chapter leader's password
   */
  newPassword?: string;
  /**
   * Confirming the new password
   */
  confirmNewPassword?: string;
  /**
   * Push notification token for notifications
   */
  notificationPushToken?: string;
  /**
   * Flag indicating if notifications are enabled
   */
  notificationsEnabled?: boolean;
}

interface GetConversationRequest {
  /**
   * Offset for retrieving conversation
   */
  offset: number;
  /**
   * ID of the potential new member (PNM) for conversation retrieval
   */
  pnmId: string;
}

interface FocusConversationRequest {
  /**
   * ID of the potential new member (PNM) for focusing conversation
   */
  pnmId: string;
}

interface GetConversationsRequest {
  /**
   * Offset for retrieving conversations
   */
  offset: number;
}

interface SendMassMessageRequest {
  /**
   * List of PNM IDs to send mass message
   */
  pnms: string[];
  /**
   * Message content for mass messaging
   */
  message: string;
}

interface SendDirectMessageRequest {
  /**
   * ID of the potential new member (PNM) for direct messaging
   */
  pnm: string;
  /**
   * Message content for direct messaging
   */
  message: string;
}

interface CreatePnmRequest {
  /**
   * First name of the potential new member (PNM)
   */
  firstName: string;
  /**
   * Last name of the potential new member (PNM)
   */
  lastName: string;
  /**
   * Phone number of the potential new member (PNM)
   */
  phoneNumber: string;
  /**
   * Classification of the potential new member (PNM)
   */
  classification?: string;
  /**
   * Instagram handle of the potential new member (PNM)
   */
  instagram?: string;
  /**
   * Snapchat handle of the potential new member (PNM)
   */
  snapchat?: string;
}

interface UpdatePnmRequest {
  /**
   * ID of the potential new member (PNM) to be updated
   */
  id: string;
  /**
   * Updated first name of the potential new member (PNM)
   */
  firstName?: string;
  /**
   * Updated last name of the potential new member (PNM)
   */
  lastName?: string;
  /**
   * Updated phone number of the potential new member (PNM)
   */
  phoneNumber?: string;
  /**
   * Updated classification of the potential new member (PNM)
   */
  classification?: string;
  /**
   * Updated Instagram handle of the potential new member (PNM)
   */
  instagram?: string;
  /**
   * Updated Snapchat handle of the potential new member (PNM)
   */
  snapchat?: string;
  /**
   * Flag indicating if the PNM is starred
   */
  starred?: boolean;
}

interface DeletePnmRequest {
  /**
   * ID of the potential new member (PNM) to be deleted
   */
  id: string;
}

interface GetEventsRequest {
  /**
   * Offset for retrieving events
   */
  offset: number;
}

interface CreateEventRequest {
  /**
   * Title of the event to be created
   */
  title: string;
  /**
   * Description of the event
   */
  description: string;
  /**
   * Location of the event
   */
  location: string;
  /**
   * Start date of the event
   */
  startDate: string;
  /**
   * End date of the event
   */
  endDate: string;
}

interface UpdateEventRequest {
  /**
   * ID of the event to be updated
   */
  id: string;
  /**
   * Updated title of the event
   */
  title: string;
  /**
   * Updated description of the event
   */
  description: string;
  /**
   * Updated location of the event
   */
  location: string;
  /**
   * Updated start date of the event
   */
  startDate: string;
  /**
   * Updated end date of the event
   */
  endDate: string;
}

interface DeleteEventRequest {
  /**
   * ID of the event to be deleted
   */
  id: string;
}

interface GetPnmRequest {
  /**
   * The ID of the potential new member (PNM) to be retrieved
   */
  id: string;
}

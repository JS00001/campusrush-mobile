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

type LogoutResponse = API.Response;

type DeletePnmResponse = API.Response;

type DeletePnmsResponse = API.Response;

type GetEntitlementsResponse = API.Response<EntitlementDetails>;

type GetChaptersResponse = API.Response<{
  /**
   * List of chapters
   */
  chapters: string[];
  /**
   * List of schools
   */
  schools: string[];
}>;

type LoginResponse = API.Response<{
  /**
   * Chapter information
   */
  chapter: Chapter;
  /**
   * Access token for authentication
   */
  accessToken: string;
  /**
   * Refresh token for token refreshing
   */
  refreshToken: string;
}>;

type RegisterResponse = API.Response<{
  /**
   * Chapter information
   */
  chapter: Chapter;
  /**
   * Access token for authentication
   */
  accessToken: string;
  /**
   * Refresh token for token refreshing
   */
  refreshToken: string;
}>;

type GetChapterResponse = API.Response<{
  /**
   * Chapter information
   */
  chapter: Chapter;
}>;

type CheckEmailResponse = API.Response<{
  /**
   * Indicates whether the email exists
   */
  exists: boolean;
}>;

type VerifyChapterResponse = API.Response<{
  /**
   * Chapter information
   */
  chapter: Chapter;
}>;

type ResendVerificationResponse = API.Response<{
  /**
   * A message indicating the result of the resend verification action
   */
  message: string;
}>;

type RefreshAccessTokenResponse = API.Response<{
  /**
   * Refreshed access token
   */
  accessToken: string;
}>;

type UpdateChapterResponse = API.Response<{
  /**
   * Updated chapter information
   */
  chapter: Chapter;
}>;

type GetChapterStatisticsResponse = API.Response<{
  /**
   * Number of potential new members (PNMs)
   */
  pnms: number;
  /**
   * Number of starred PNMs
   */
  starredPnms: number;
  /**
   * List of recent PNMs
   */
  recentPnms: PNM[];
}>;

type GetPnmsResponse = API.Response<{
  /**
   * List of potential new members (PNMs)
   */
  pnms: PNM[];
}>;

type GetAdminChaptersResponse = API.Response<{
  /**
   * List of admin chapters
   */
  chapters: Chapter[];
}>;

type GetConversationResponse = API.Response<{
  /**
   * Conversation information
   */
  conversation: Conversation | null;
  /**
   * Offset for the next conversation retrieval
   */
  nextOffset: number;
  /**
   * Indicates whether there is a next page of conversations
   */
  hasNextPage: boolean;
}>;

type FocusConversationResponse = API.Response<{
  /**
   * Focused conversation information
   */
  conversation: Conversation;
}>;

type GetConversationsResponse = API.Response<{
  /**
   * List of conversations
   */
  conversations: Conversation[];
  /**
   * Offset for the next conversation retrieval
   */
  nextOffset: number;
  /**
   * Indicates whether there is a next page of conversations
   */
  hasNextPage: boolean;
}>;

type GetContactsResponse = API.Response<{
  /**
   * List of all potential new members (PNMs)
   */
  all: PNM[];
  /**
   * List of favorited PNMs
   */
  favorited: PNM[];
  /**
   * List of suggested PNMs
   */
  suggested: PNM[];
  /**
   * List of uncontacted PNMs
   */
  uncontacted: PNM[];
}>;

type SendMassMessageResponse = API.Response<{
  /**
   * List of conversations after sending a mass message
   */
  conversations: Conversation[];
  /**
   * List of messages sent
   */
  messages: Message[];
}>;

type SendDirectMessageResponse = API.Response<{
  /**
   * Conversation information after sending a direct message
   */
  conversation: Conversation;
  /**
   * Message information after sending a direct message
   */
  message: Message;
}>;

type CreatePnmResponse = API.Response<{
  /**
   * Created potential new member (PNM) information
   */
  pnm: PNM;
}>;

type UpdatePnmResponse = API.Response<{
  /**
   * Updated potential new member (PNM) information
   */
  pnm: PNM;
}>;

type GetVersionResponse = API.Response<{
  /**
   * Version information
   */
  version: string;
}>;

type DeleteChapterResponse = API.Response<{
  /**
   * Indicates the success of the chapter deletion
   */
  success: boolean;
}>;

type GetEventsResponse = API.Response<{
  /**
   * List of events
   */
  events: Event[];
  /**
   * Offset for the next event retrieval
   */
  nextOffset: number;
  /**
   * Indicates whether there is a next page of events
   */
  hasNextPage: boolean;
}>;

type DeleteEventsResponse = API.Response<{
  /**
   * List of events after deletion
   */
  events: Event[];
}>;

type CreateEventResponse = API.Response<{
  /**
   * Created event information
   */
  event: Event;
}>;

type UpdateEventResponse = API.Response<{
  /**
   * Updated event information
   */
  event: Event;
}>;

type DeleteEventResponse = API.Response<{
  /**
   * Indicates the success of the event deletion
   */
  success: boolean;
}>;

type GetPnmResponse = API.Response<{
  /**
   * Potential new member (PNM) information
   */
  pnm: PNM;
}>;

type GetEventResponse = API.Response<{
  /**
   * Event information
   */
  event: Event;
}>;

type GetAdminChapterResponse = API.Response<{
  /**
   * Admin chapter information
   */
  chapter: Chapter;
}>;

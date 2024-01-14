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

type APIResponse<T = {}> = {
  data: {
    data: T & {
      error?: APIError;
    };
  };
};

interface APIError {
  error: {
    field?: string;
    traceback: string;
    message: string;
    humanMessage: string;
  };
}

type LogoutAPIResponse = APIResponse;

type DeletePnmAPIResponse = APIResponse;

type DeletePnmsAPIResponse = APIResponse;

type GetChaptersAPIResponse = APIResponse<{
  chapters: string[];
  schools: string[];
}>;

type LoginAsChapterAPIResponse = APIResponse<{
  chapter: Chapter;
  accessToken: string;
  refreshToken: string;
}>;

type RegisterAsChapterAPIResponse = APIResponse<{
  chapter: Chapter;
  accessToken: string;
  refreshToken: string;
}>;

type GetChapterAPIResponse = APIResponse<{
  chapter: Chapter;
}>;

type CheckChapterExistsAPIResponse = APIResponse<{
  exists: boolean;
}>;

type CheckEmailExistsAPIResponse = APIResponse<{
  exists: boolean;
}>;

type VerifyChapterAPIResponse = APIResponse<{
  chapter: Chapter;
}>;

type ResendVerificationAPIResponse = APIResponse<{
  message: string;
}>;

type RefreshAccessTokenAPIResponse = APIResponse<{
  accessToken: string;
}>;

type UpdateChapterAPIResponse = APIResponse<{
  chapter: Chapter;
}>;

type GetChapterStatisticsAPIResponse = APIResponse<{
  pnms: number;
  starredPnms: number;
  recentPnms: PNM[];
}>;

type GetPnmsAPIResponse = APIResponse<{
  pnms: PNM[];
}>;

type GetAdminStatisticsAPIResponse = APIResponse<{
  numChapters: number;
  numPayingChapters: number;
}>;

type GetAdminChaptersAPIResponse = APIResponse<{
  chapters: Chapter[];
}>;

type GetAdminChapterAPIResponse = APIResponse<{
  chapter: Chapter;
}>;

type UpgradeChapterAPIResponse = APIResponse<{
  chapter: Chapter;
}>;

type DowngradeChapterAPIResponse = APIResponse<{
  chapter: Chapter;
}>;

type GetConversationAPIResponse = APIResponse<{
  conversation: Conversation | null;
  nextOffset: number;
  hasNextPage: boolean;
}>;

type FocusConversationAPIResponse = APIResponse<{
  conversation: Conversation;
}>;

type GetConversationsAPIResponse = APIResponse<{
  conversations: Conversation[];
  nextOffset: number;
  hasNextPage: boolean;
}>;

type GetContactsAPIResponse = APIResponse<{
  all: PNM[];
  favorited: PNM[];
  suggested: PNM[];
  uncontacted: PNM[];
}>;

type SendMassMessageAPIResponse = APIResponse<{
  conversations: Conversation[];
  messages: Message[];
}>;

type SendDirectMessageAPIResponse = APIResponse<{
  conversation: Conversation;
  message: Message;
}>;

type CreatePnmAPIResponse = APIResponse<{
  pnm: PNM;
}>;

type UpdatePnmAPIResponse = APIResponse<{
  pnm: PNM;
}>;

type GetEntitlementsAPIResponse = APIResponse<EntitlementDetails>;

type GetVersionAPIResponse = APIResponse<{
  version: string;
}>;

type DeleteChapterAPIResponse = APIResponse<{
  success: boolean;
}>;

type GetEventsAPIResponse = APIResponse<{
  events: Event[];
  nextOffset: number;
  hasNextPage: boolean;
}>;

type DeleteEventsAPIResponse = APIResponse<{
  events: Event[];
}>;

type CreateEventAPIResponse = APIResponse<{
  event: Event;
}>;

type UpdateEventAPIResponse = APIResponse<{
  event: Event;
}>;

type DeleteEventAPIResponse = APIResponse<{
  success: boolean;
}>;

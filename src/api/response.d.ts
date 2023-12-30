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

type GetOrganizationsAPIResponse = APIResponse<{
  organizations: string[];
  schools: string[];
}>;

type LoginAsOrganizationAPIResponse = APIResponse<{
  organization: Organization;
  accessToken: string;
  refreshToken: string;
}>;

type RegisterAsOrganizationAPIResponse = APIResponse<{
  organization: Organization;
  accessToken: string;
  refreshToken: string;
}>;

type GetOrganizationAPIResponse = APIResponse<{
  organization: Organization;
}>;

type CheckOrganizationExistsAPIResponse = APIResponse<{
  exists: boolean;
}>;

type CheckEmailExistsAPIResponse = APIResponse<{
  exists: boolean;
}>;

type VerifyOrganizationAPIResponse = APIResponse<{
  organization: Organization;
}>;

type ResendVerificationAPIResponse = APIResponse<{
  message: string;
}>;

type RefreshAccessTokenAPIResponse = APIResponse<{
  accessToken: string;
}>;

type UpdateOrganizationAPIResponse = APIResponse<{
  organization: Organization;
}>;

type GetOrganizationStatisticsAPIResponse = APIResponse<{
  pnms: number;
  starredPnms: number;
  recentPnms: PNM[];
}>;

type GetPnmsAPIResponse = APIResponse<{
  pnms: PNM[];
}>;

type GetAdminStatisticsAPIResponse = APIResponse<{
  numOrganizations: number;
  numPayingOrganizations: number;
}>;

type GetAdminOrganizationsAPIResponse = APIResponse<{
  organizations: Organization[];
}>;

type GetAdminOrganizationAPIResponse = APIResponse<{
  organization: Organization;
}>;

type UpgradeOrganizationAPIResponse = APIResponse<{
  organization: Organization;
}>;

type DowngradeOrganizationAPIResponse = APIResponse<{
  organization: Organization;
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

type GetEntitlementsAPIResponse = APIResponse<{
  data: EntitlementDetails;
}>;

type GetVersionAPIResponse = APIResponse<{
  version: string;
}>;

type DeleteOrganizationAPIResponse = APIResponse<{
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

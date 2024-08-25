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

import type { API } from '.';
import type { Chapter } from '../models/chapter';
import type { Conversation } from '../models/conversation';
import type { Event } from '../models/event';
import type { EventResponse } from '../models/eventResponse';
import type { Message } from '../models/message';
import type { PNM } from '../models/pnm';
import type { RefreshToken } from '../models/refreshToken';
import type { Metadata } from '../app';
import type { EntitlementDetails } from '../entitlements';

export type LogoutResponse = API.Response<{}>;

export type DeletePnmResponse = API.Response<{}>;

export type DeleteChapterSessionResponse = API.Response<{}>;

export type DeletePnmsResponse = API.Response<{}>;

export type GrantAdminChapterEntitlementsResponse = API.Response<{}>;

export type RevokeAdminChapterEntitlementsResponse = API.Response<{}>;

export type ResetPasswordResponse = API.Response<{}>;

export type GetEntitlementsResponse = API.Response<EntitlementDetails>;

export type GetChaptersResponse = API.Response<{
  /** List of chapters */
  chapters: string[];
  /** List of schools */
  schools: string[];
}>;

export type LoginResponse = API.Response<{
  /** Chapter information */
  chapter: Chapter;
  /** Access token for authentication */
  accessToken: string;
  /** Refresh token for token refreshing */
  refreshToken: string;
}>;

export type RegisterResponse = API.Response<{
  /** Chapter information */
  chapter: Chapter;
  /** Access token for authentication */
  accessToken: string;
  /** Refresh token for token refreshing */
  refreshToken: string;
}>;

export type ChangePasswordResponse = API.Response<{
  /** Chapter information */
  chapter: Chapter;
  /** Access token for authentication */
  accessToken: string;
  /** Refresh token for token refreshing */
  refreshToken: string;
}>;

export type GetChapterResponse = API.Response<{
  /** Chapter information */
  chapter: Chapter;
}>;

export type CheckEmailResponse = API.Response<{
  /** Indicates whether the email exists */
  exists: boolean;
}>;

export type VerifyChapterResponse = API.Response<{
  /** Chapter information */
  chapter: Chapter;
}>;

export type ResendVerificationResponse = API.Response<{
  /** A message indicating the result of the resend verification action */
  message: string;
}>;

export type RefreshAccessTokenResponse = API.Response<{
  /** Refreshed access token */
  accessToken: string;
}>;

export type UpdateChapterResponse = API.Response<{
  /** Updated chapter information */
  chapter: Chapter;
}>;

export type GetChapterStatisticsResponse = API.Response<{
  /** Number of potential new members (PNMs) */
  pnms: number;
  /** Number of starred PNMs */
  starredPnms: number;
  /** List of recent PNMs */
  recentPnms: PNM[];
}>;

export type GetPnmsResponse = API.Response<{
  /** List of potential new members (PNMs) */
  pnms: PNM[];
}>;

export type GetAdminChaptersResponse = API.Response<{
  /** List of admin chapters */
  chapters: Chapter[];
}>;

export type GetConversationResponse = API.Response<{
  /** Conversation information */
  conversation: Conversation | null;
  /** Offset for the next conversation retrieval */
  nextOffset: number;
  /** Indicates whether there is a next page of conversations */
  hasNextPage: boolean;
}>;

export type FocusConversationResponse = API.Response<{
  /** Focused conversation information */
  conversation: Conversation;
}>;

export type GetConversationsResponse = API.Response<{
  /** List of conversations */
  conversations: Conversation[];
  /** Offset for the next conversation retrieval */
  nextOffset: number;
  /** Indicates whether there is a next page of conversations */
  hasNextPage: boolean;
}>;

export type GetContactsResponse = API.Response<{
  /** List of all potential new members (PNMs) */
  all: PNM[];
  /** List of favorited PNMs */
  favorited: PNM[];
  /** List of suggested PNMs */
  suggested: PNM[];
  /** List of uncontacted PNMs */
  uncontacted: PNM[];
}>;

export type SendMassMessageResponse = API.Response<{
  /** List of conversations after sending a mass message */
  conversations: Conversation[];
  /** List of messages sent */
  messages: Message[];
}>;

export type SendDirectMessageResponse = API.Response<{
  /** Conversation information after sending a direct message */
  conversation: Conversation;
  /** Message information after sending a direct message */
  message: Message;
}>;

export type CreatePnmResponse = API.Response<{
  /** Created potential new member (PNM) information */
  pnm: PNM;
}>;

export type UpdatePnmResponse = API.Response<{
  /** Updated potential new member (PNM) information */
  pnm: PNM;
}>;

export type GetMetadataResponse = API.Response<Metadata>;

export type DeleteChapterResponse = API.Response<{
  /** Indicates the success of the chapter deletion */
  success: boolean;
}>;

export type GetEventsResponse = API.Response<{
  /** List of events */
  events: Event[];
  /** Offset for the next event retrieval */
  nextOffset: number;
  /** Indicates whether there is a next page of events */
  hasNextPage: boolean;
}>;

export type DeleteEventsResponse = API.Response<{
  /** List of events after deletion */
  events: Event[];
}>;

export type CreateEventResponse = API.Response<{
  /** Created event information */
  event: Event;
}>;

export type UpdateEventResponse = API.Response<{
  /** Updated event information */
  event: Event;
}>;

export type DeleteEventResponse = API.Response<{
  /** Indicates the success of the event deletion */
  success: boolean;
}>;

export type GetPnmResponse = API.Response<{
  /** Potential new member (PNM) information */
  pnm: PNM;
}>;

export type GetEventResponse = API.Response<{
  /** Event information */
  event: Event;
  /** Response information */
  responses: EventResponse[];
}>;

export type GetAdminChapterResponse = API.Response<{
  /** Admin chapter information */
  chapter: Chapter;
}>;

export type GetChapterSessionsResponse = API.Response<{
  /** List of sessions */
  sessions: RefreshToken[];
}>;

export type GetAdminChapterEntitlementsResponse = API.Response<
  {
    /**
     * The entitlement ID. For example, premium or pro.
     */
    id: string;
    /**
     * "True" means a user has active entitlement.
     * Please note, active = true does not mean that a subscription will be renewed.
     * A user can have active entitlement, while auto-renewal for the subscription was switched off.
     */
    active: boolean;
    /**
     * Time at which the entitlement was started. Measured in seconds since the Unix epoch.
     */
    started: number;
    /**
     * 	The expiration time for the entitlement is measured in seconds since the
     *  Unix epoch and denotes when the entitlement will no longer be available.
     */
    expires: number;
    /**
     * Source of the purchase via which the entitlement was activated.
     * Values:
     * – appstore: App Store
     * – playstore: Play Store
     * – stripe: Stripe
     * – unknown: unable to detect the source
     * – manual: the entitlement was activated manually
     */
    source: 'appstore' | 'playstore' | 'stripe' | 'unknown' | 'manual';
    /**
     * A product granted in the entitlement.
     */
    product: {
      /**
       * The product identifier in Qonversion.
       */
      product_id: string;
      /**
       * Subscription linked to the product. Exists only for subscription type products.
       */
      subscription?: {
        /**
         * Possible values:
         * – normal: the product is in it's normal period
         * – trial: free trial period
         * – intro: introductory pricing period
         */
        current_period_type: 'normal' | 'trial' | 'intro';
        /**
         * A renewal state of the product. It can have the following values:
         * – will_renew: subscription is active, and auto-renew status is on
         * – canceled: auto-renew status is off
         * – billing_issue: there was some billing issue.
         */
        renewal_state: 'will_renew' | 'canceled' | 'billing_issue';
      };
    };
  }[]
>;

export type GetWebsiteMetadataResponse = {
  /** The title of the website */
  title: string;
  /** The description of the website */
  description: string;
  /** The image URL of the website */
  image?: string;
};

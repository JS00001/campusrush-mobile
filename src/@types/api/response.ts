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
import type { IAdminChapter, IChapter } from '../models/chapter';
import type { IConversation } from '../models/conversation';
import type { IEvent } from '../models/event';
import type { IEventResponse } from '../models/event-response';
import type { IMessage } from '../models/message';
import type { IPNM } from '../models/pnm';
import type { Metadata } from '../app';
import type { EntitlementDetails } from '../entitlements';
import type { IViolation } from '../models/violation';
import type { INotification } from '../models/notification';
import type { IUser } from '../models/user';
import type { IForm } from '../models/form';
import type { IFormResponse } from '../models/form-response';
import type { IChapterInvite } from '../models/chapter-invite';

export type LogoutResponse = API.Response<{}>;

export type DeletePnmResponse = API.Response<{}>;

export type DeleteFormResponse = API.Response<{}>;

export type GrantAdminChapterEntitlementsResponse = API.Response<{}>;

export type RevokeAdminChapterEntitlementsResponse = API.Response<{}>;

export type ResetPasswordResponse = API.Response<{}>;

export type SendChapterNotificationResponse = API.Response<{}>;

export type GetEntitlementsResponse = API.Response<EntitlementDetails>;

export type CreateChapterUserResponse = API.Response<{}>;

export type DeleteChapterUserResponse = API.Response<{}>;

export type GetChaptersResponse = API.Response<{
  /** List of chapters */
  chapters: string[];
  /** List of schools */
  schools: string[];
}>;

export type LoginResponse = API.Response<{
  /** User information */
  user: IUser;
  /** Chapter information */
  chapter: IChapter;
  /** Access token for authentication */
  accessToken: string;
  /** Refresh token for token refreshing */
  refreshToken: string;
}>;

export type RegisterResponse = API.Response<{
  /** User information */
  user: IUser;
  /** Chapter information */
  chapter: IChapter;
  /** Access token for authentication */
  accessToken: string;
  /** Refresh token for token refreshing */
  refreshToken: string;
}>;

export type ChangePasswordResponse = API.Response<{
  /** User information */
  user: IUser;
  /** Chapter information */
  chapter: IChapter;
  /** Access token for authentication */
  accessToken: string;
  /** Refresh token for token refreshing */
  refreshToken: string;
}>;

export type GetUserResponse = API.Response<{
  /** User information */
  user: IUser;
  /** Chapter information */
  chapter: IChapter;
}>;

export type CheckEmailResponse = API.Response<{
  /** Indicates whether the email exists */
  exists: boolean;
}>;

export type VerifyChapterResponse = API.Response<{
  /** User information */
  user: IUser;
  /** Chapter information */
  chapter: IChapter;
}>;

export type UpdateUserResponse = API.Response<{
  /** Updated user information */
  user: IUser;
  /** Updated chapter information */
  chapter: IChapter;
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
  /** The user for the chapter */
  user: IUser;
  /** Updated chapter information */
  chapter: IChapter;
}>;

export type GetChapterStatisticsResponse = API.Response<{
  /** Number of potential new members (PNMs) */
  pnms: number;
  /** Number of starred PNMs */
  starredPnms: number;
  /** List of recent PNMs */
  recentPnms: IPNM[];
  /** The number of messages the chapter has sent */
  messageCount: number;
}>;

export type GetPnmsResponse = API.Response<{
  /** List of potential new members (PNMs) */
  pnms: IPNM[];
}>;

export type GetAdminChaptersResponse = API.Response<{
  /** List of admin chapters */
  chapters: IAdminChapter[];
}>;

export type GetConversationResponse = API.Response<{
  /** Conversation information */
  conversation: IConversation | null;
  /** Offset for the next conversation retrieval */
  nextOffset: number;
  /** Indicates whether there is a next page of conversations */
  hasNextPage: boolean;
}>;

export type FocusConversationResponse = API.Response<{
  /** Focused conversation information */
  conversation: IConversation;
}>;

export type GetConversationsResponse = API.Response<{
  /** Unread conversations count */
  unreadCount: number;
  /** List of conversations */
  conversations: IConversation[];
  /** Offset for the next conversation retrieval */
  nextOffset: number;
  /** Indicates whether there is a next page of conversations */
  hasNextPage: boolean;
}>;

export type GetContactsResponse = API.Response<{
  /** List of all potential new members (PNMs) */
  all: IPNM[];
  /** List of favorited PNMs */
  favorited: IPNM[];
  /** List of suggested PNMs */
  suggested: IPNM[];
  /** List of uncontacted PNMs */
  uncontacted: IPNM[];
}>;

export type SendMassMessageResponse = API.Response<{
  /** List of conversations after sending a mass message */
  conversations: IConversation[];
  /** List of messages sent */
  messages: IMessage[];
}>;

export type SendDirectMessageResponse = API.Response<{
  /** Conversation information after sending a direct message */
  conversation: IConversation;
  /** Message information after sending a direct message */
  message: IMessage;
}>;

export type CreatePnmResponse = API.Response<{
  /** Created potential new member (PNM) information */
  pnm: IPNM;
}>;

export type UpdatePnmResponse = API.Response<{
  /** Updated potential new member (PNM) information */
  pnm: IPNM;
}>;

export type GetMetadataResponse = API.Response<Metadata>;

export type DeleteChapterResponse = API.Response<{
  /** Indicates the success of the chapter deletion */
  success: boolean;
}>;

export type GetEventsResponse = API.Response<{
  /** List of events */
  events: IEvent[];
  /** Offset for the next event retrieval */
  nextOffset: number;
  /** Indicates whether there is a next page of events */
  hasNextPage: boolean;
}>;

export type DeleteEventsResponse = API.Response<{
  /** List of events after deletion */
  events: IEvent[];
}>;

export type CreateEventResponse = API.Response<{
  /** Created event information */
  event: IEvent;
}>;

export type UpdateEventResponse = API.Response<{
  /** Updated event information */
  event: IEvent;
}>;

export type DeleteEventResponse = API.Response<{
  /** Indicates the success of the event deletion */
  success: boolean;
}>;

export type GetPnmResponse = API.Response<{
  /** Potential new member (PNM) information */
  pnm: IPNM;
}>;

export type GetEventResponse = API.Response<{
  /** Event information */
  event: IEvent;
  /** Response information */
  responses: IEventResponse[];
}>;

export type GetAdminChapterResponse = API.Response<{
  /** Admin chapter information */
  chapter: IAdminChapter;
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

export type UploadFileResponse = API.Response<{
  /** Attachment URL */
  url: string;
}>;

export type GetAdminStatisticsResponse = API.Response<{
  /** The number of chapters */
  chapters: number;
  /** The number of pro chapters */
  proChapters: number;
  /** The total number of pnms across all chapters */
  pnms: number;
  /** The average number of pnms per chapter */
  avgPnmsPerChapter: number;
  /** The number of conversations across all chapters */
  conversations: number;
  /** The average number of conversations per chapter */
  avgConversationsPerChapter: number;
  /** The number of messages across all chapters */
  messages: number;
  /** The average number of messages per conversation */
  avgMessagesPerConversation: number;
}>;

export type GetViolationsResponse = API.Response<
  {
    /** The chapter who has the violation */
    user: IUser;
    /** The list of violations */
    violations: IViolation[];
  }[]
>;

export type GetNotificationsResponse = API.Response<{
  /** List of notifications */
  notifications: INotification[];
  /** The count of notifications that are non-message */
  count: number;
  /** The next offset for the next notification retrieval */
  nextOffset: number;
  /** Indicates whether there is a next page of notifications */
  hasNextPage: boolean;
}>;

export type DeletePnmsResponse = API.Response<{
  /** The PNMs left once deleted */
  pnms: IPNM[];
}>;

export type GetFormsResponse = API.Response<{
  /** List of forms */
  forms: IForm[];
}>;

export type DeleteFormsResponse = API.Response<{
  /** List of forms after deletion */
  forms: IForm[];
}>;

export type CreateFormResponse = API.Response<{
  /** Created form information */
  form: IForm;
}>;

export type UpdateFormResponse = API.Response<{
  /** Updated form information */
  form: IForm;
}>;

export type GetFormResponse = API.Response<{
  /** Form information */
  form: IForm;
}>;

export type GetFormResponsesResponse = API.Response<{
  /** List of responses to the form */
  responses: IFormResponse[];
}>;

export type GetPnmResponsesResponse = API.Response<{
  /** List of responses to the form */
  responses: (Omit<IFormResponse, 'form' | 'pnm'> & {
    form: IForm;
    pnm: IPNM;
  })[];
}>;

export type PurchasePhoneNumberResponse = API.Response<{
  /** The phone number that was purchased */
  phoneNumber: string;
}>;

export type GetChapterUsersResponse = API.Response<{
  /** List of users */
  users: IUser[];
}>;

export type UpdateChapterUserResponse = API.Response<{
  /** Updated user information */
  user: IUser;
}>;

export type GetChapterInviteResponse = API.Response<{
  /** The invite information */
  invite: IChapterInvite;
  /** The chapter information */
  chapter: {
    /** The chapters name */
    name: string;
    /** The chapters school */
    school: string;
    /** The chapters owner */
    owner: {
      /** The owner's first name */
      firstName: string;
      /** The owner's last name */
      lastName: string;
    };
  };
}>;

export type RegisterChapterInviteResponse = API.Response<{
  /** User information */
  user: IUser;
  /** Chapter information */
  chapter: IChapter;
  /** Access token for authentication */
  accessToken: string;
  /** Refresh token for token refreshing */
  refreshToken: string;
}>;

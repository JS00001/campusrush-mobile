/*
 * Created on Sun Aug 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

/** The base account */
export interface Chapter {
  /** The id of the chapter */
  _id: string;
  /** The name of the chapters organization, IE: Delta Chi */
  name: string;
  /** The first name of the chapter's user */
  firstName: string;
  /** The last name of the chapter's user */
  lastName: string;
  /** The email of the chapter's user */
  email: string;
  /** The school of the chapter */
  school: string;
  /** Whether the chapter has verified their email or not */
  verified: boolean;
  /** The pnms that the chapter has added */
  pnms: string[];
  /** The role of the chapter */
  role: 'user' | 'admin';
  /** The custom phone number of the chapter (the number that PNMs will message) */
  phoneNumber: string;
  /** The id of the custom phone number */
  phoneNumberId: string;
  /** The date the phone number was created */
  phoneNumberCreatedAt: Date;
  /** The Qonversion customer id of the chapter. Set on creation */
  customerId: string;
  /** Whether the chapter has an active subscription or not */
  isPro: boolean;
  /** The Expo push notification tokens of the chapter */
  notificationsEnabled: boolean;
  /** Whether the c hapter has enabled link sharing or not */
  linkSharingEnabled: boolean;
  /** The unique ID for this chapter that PNMs can use to add themselves */
  linkSharingCode: string;
  /** The date the chapter was last active (last time they hit the API) */
  lastOnline: Date;
  /** The client version that the chapter is currently on */
  clientVersion: string;
  /** The date the chapter was created */
  createdAt: Date;
  /** The date the chapter was last updated */
  updatedAt: Date;
}

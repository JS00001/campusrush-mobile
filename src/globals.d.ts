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

interface Chapter {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  verified: boolean;
  pnms: PNM[];

  role: 'user' | 'admin';

  phoneNumber: string;
  phoneNumberId: string;
  phoneNumberCreatedAt: Date;

  customerId: string;
  isPro: boolean;

  notificationsEnabled: boolean;

  linkSharingEnabled: boolean;
  linkSharingCode: string;

  clientVersion: string;
  lastOnline: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Each PNM is a "potential new member" of a chapter, IE the
 * chapter "owns" the PNM.
 */
interface PNM {
  _id: string;

  chapter: string;
  phoneNumber: string;
  firstName?: string;
  lastName?: string;
  displayName: string;

  tags: string[];
  instagram?: string;
  snapchat?: string;

  starred: boolean;

  createdAt: Date;
  updatedAt: Date;
}

interface Message {
  _id: string;
  chapter: string;
  pnm: string;

  sent: boolean;
  content: string;

  createdAt: Date;
  updatedAt: Date;
}

interface Conversation {
  _id: string;
  chapter: string;
  pnm: PNM;

  read: boolean;
  messages: Message[];
  lastMessage: string;
  lastMessageSentAt: Date;
  updatedAt: Date;
  createdAt: Date;
}

interface Event {
  _id: string;
  chapter: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface EventResponse {
  _id: string;
  event: string;
  pnm: PNM;
  response: 'yes' | 'no' | 'maybe';
  createdAt: Date;
  updatedAt: Date;
}

interface TagCategory {
  id: string;
  name: string;
  tags: string[];
}

interface Metadata {
  version: string;
  latestVersion: string;
  tags: TagCategory[];
  entitlements: EntitlementDetails;
}

interface RefreshToken {
  _id: string;
  chapter: string;
  deviceType: string;
  ipAddress: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

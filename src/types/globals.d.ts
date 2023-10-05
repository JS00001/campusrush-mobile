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

interface Organization {
  // IDENTIFYING INFORMATION
  _id: string;
  // Organizations name (IE: Alpha Phi)
  name: string;
  // Organization owner first name
  firstName: string;
  // Organization owner last name
  lastName: string;
  // Organization owner email
  email: string;
  // Organizations school (IE: University of Texas at Austin)
  school: string;
  // Whether the organizations email has been verified
  verified: boolean;
  // All PNMs associated with the organization
  pnms: PNM[];

  // AUTHENTICATION
  // The role of the organization (admin is equal to system admin/developer)
  role: 'user' | 'admin';

  // BILLING
  // The revenuecat customer id, randomly generated when the organization is created
  customerId: string;
  // The revenuecat entitlements associated with the organization (basic, pro)
  entitlements: string[];

  // NOTIFICATIONS
  // The expo push tokens associated with the organization
  notificationsEnabled: boolean;
}
interface PNM {
  _id: string;
  // Organization information
  organization: string;
  // Identifying information
  firstName: string;
  lastName: string;
  phoneNumber: string;
  // Social media
  instagram: string;
  snapchat: string;
  // Other information
  receivedBid: boolean;
  classification: string;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

interface APIError {
  field?: string;
  message: string;
  humanMessage: string;
}

interface Message {
  // The organization that sent or received the message
  organization: string;
  // The PNM that sent or received the message
  pnm: string;
  // Whether the message was sent or received by the organization
  sent: boolean;
  // The message content
  content: string;
  // When the message was sent
  createdAt: Date;
  // When the message was updated (IE: edited)
  updatedAt: Date;
}

interface Conversation {
  // The organization that sent or received the message
  organization: string;
  // The PNM that sent or received the message
  pnm: string;
  // Whether the conversation is read or unread
  read: boolean;
  // The last message sent or received
  lastMessage: string;
  // When the conversation was last updated
  updatedAt: Date;
  // When the conversation was created
  createdAt: Date;
}

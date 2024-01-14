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
  // IDENTIFYING INFORMATION
  // Chapters name (IE: Alpha Phi)
  name: string;
  // Chapter owner first name
  firstName: string;
  // Chapter owner last name
  lastName: string;
  // Chapter owner email
  email: string;
  // Chapters school (IE: University of Texas at Austin)
  school: string;
  // Whether the chapters email has been verified
  verified: boolean;
  // All PNMs associated with the chapter
  pnms: PNM[];

  // AUTHENTICATION
  // The role of the chapter (admin is equal to system admin/developer)
  role: 'user' | 'admin';

  // MESSAGING
  // The phone number associated with the chapter
  phoneNumber: string;
  // The phone numbers id
  phoneNumberId: string;
  // When the phone number was created
  phoneNumberCreatedAt: Date;

  // BILLING
  // The revenuecat customer id, randomly generated when the chapter is created
  customerId: string;
  // The revenuecat entitlements associated with the chapter (basic, pro)
  entitlements: string[];

  // NOTIFICATIONS
  // The expo push tokens associated with the chapter
  notificationsEnabled: boolean;

  // LINK SHARING
  // Whether the chapter has link sharing enabled
  linkSharingEnabled: boolean;
  // The link sharing code
  linkSharingCode: string;

  // When the chapter was created
  createdAt: Date;
  // When the chapter was last updated
  updatedAt: Date;
}
interface PNM {
  _id: string;
  // Chapter information
  chapter: string;
  // Identifying information
  firstName: string;
  lastName: string;
  phoneNumber: string;
  // Social media
  instagram: string;
  snapchat: string;
  // Other information
  starred: boolean;
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
  _id?: string;
  // The chapter that sent or received the message
  chapter: string;
  // The PNM that sent or received the message
  pnm: string;
  // Whether the message was sent or received by the chapter
  sent: boolean;
  // The message content
  content: string;
  // When the message was sent
  createdAt: Date;
  // When the message was updated (IE: edited)
  updatedAt: Date;
}

interface TimestampedMessage extends Message {
  // The date the message was sent
  date?: string;
  // Whether or not there should be a timestamp shown
  showTimestamp?: boolean;
  // Whether or not to show the date
  showDate?: boolean;
}

interface Conversation {
  _id?: string;
  // The chapter that sent or received the message
  chapter: string;
  // The PNM that sent or received the message
  pnm: {
    // The PNM's id
    _id: string;
    // The PNM's first name
    firstName: string;
    // The PNM's last name
    lastName: string;
  };
  // Whether the conversation is read or unread
  read: boolean;
  // Messages
  messages: Message[];
  // The last message sent or received
  lastMessage: string;
  // When the last message was sent or received
  lastMessageSentAt: Date;
  // When the conversation was last updated
  updatedAt: Date;
  // When the conversation was created
  createdAt: Date;
}

interface Event {
  _id: string;
  // The chapter that created the event
  chapter: string;
  // The title of the event
  title: string;
  // The description of the event
  description: string;
  // The location of the event
  location: string;
  // The start date of the event
  startDate: Date;
  // The end date of the event
  endDate: Date;
  // How many users have responded yes
  yesCount: number;
  // How many users have responded no
  noCount: number;
  // The timestamp of when the event was created
  createdAt: Date;
  // The timestamp of when the event was last updated
  updatedAt: Date;
}

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

import type { PNM } from './pnm';
import type { Message } from './message';

/** A conversation between the chapter and a PNM */
export interface Conversation {
  /** The ID of the conversation */
  _id: string;
  /** The ID of the chapter */
  chapter: string;
  /** The details about the PNM */
  pnm: PNM;
  /** If the conversation has been read by the chapter */
  read: boolean;
  /** The messages in the conversation */
  messages: Message[];
  /** The last message in the conversation */
  lastMessage: string;
  /** The time the last message was sent */
  lastMessageSentAt: Date;
  /** The time the conversation was created */
  createdAt: Date;
  /** The time the conversation was last updated */
  updatedAt: Date;
}

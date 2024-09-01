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

/** A message between a PNM and a chapter */
export interface IMessage {
  /** The ID of the message */
  _id: string;
  /** The ID of the chapter */
  chapter: string;
  /** The ID of the PNM */
  pnm: string;
  /** Whether the chapter sent this message or not */
  sent: boolean;
  /** The content of the message */
  content?: string;
  /** Attachment URLs from the message */
  attachments: string[];
  /** The time the message was created */
  createdAt: Date;
  /** The time the message was last updated */
  updatedAt: Date;
}

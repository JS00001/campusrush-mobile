/*
 * Created on Thu Jun 13 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

type WebsocketMessage = {
  /** Whether to show a notification in the app for the message or not */
  notification?: {
    title: string;
    body: string;
  };
} & (
  | {
      type: 'NEW_MESSAGE';
      data: {
        conversation: Conversation;
      };
    }
  | {
      type: 'NEW_NOTIFICATION';
      data: Notification;
    }
);

interface WebsocketLog {
  /** When the log was created */
  timestamp: number;
  /** The message of the log */
  message: string;
}

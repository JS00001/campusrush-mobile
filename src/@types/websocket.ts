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

import type { IPNM } from './models/pnm';
import type { IConversation } from './models/conversation';

/** All WS message types, and the data that must be passed through the WS */
type Message =
  | {
      type: 'NEW_MESSAGE';
      data: { conversation: IConversation };
    }
  | {
      type: 'NEW_PNM';
      data: { pnm: IPNM };
    }
  | {
      type: 'NEW_NOTIFICATION';
      data: Notification;
    }
  | {
      type: 'NEW_EVENT_RESPONSE';
      data: Event;
    };

/** All WS messages that can be sent to the client */
export type WebsocketMessage = Message & {
  /** Whether to show a notification in the app for the message or not */
  notification?: {
    /** The title of the notification */
    title: string;
    /** The body of the notification */
    body: string;
  };
};

/** The logs from the websocket */
export interface WebsocketLog {
  /** When the log was created */
  timestamp: number;
  /** The message of the log */
  message: string;
}

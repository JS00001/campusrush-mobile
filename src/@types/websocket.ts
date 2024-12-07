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
import type { IEvent } from './models/event';
import type { IMessage } from './models/message';
import type { IConversation } from './models/conversation';
import type { INotification } from './models/notification';

import type { IconType } from '@/constants/icons';
import { IForm } from './models/form';
import { IFormResponse } from './models/form-response';

interface PNMData {
  pnm: IPNM;
}

interface ConversationData {
  pnm: IPNM;
  conversation: IConversation;
}

interface EventData {
  event: IEvent;
}

interface DynamicNotificationData {
  title: string;
  message: string;
  iconName?: IconType;
  iconColor?: string;
}

interface MessageErrorData {
  message: IMessage;
}

interface FormResponseData {
  form: IForm;
  response: IFormResponse;
}

/** Union of all possible payloads */
type Payload =
  | PNMData
  | ConversationData
  | EventData
  | DynamicNotificationData
  | MessageErrorData
  | FormResponseData;

/** Message structure */
interface BaseMessage<T extends Payload> {
  type: string;
  data: {
    payload: T;
    notification: INotification | null;
  };
}

/** All WebSocket message types */
type Message =
  | (BaseMessage<ConversationData> & { type: 'NEW_MESSAGE' })
  | (BaseMessage<PNMData> & { type: 'NEW_PNM' })
  | (BaseMessage<EventData> & { type: 'NEW_EVENT_RESPONSE' })
  | (BaseMessage<MessageErrorData> & { type: 'MESSAGE_ERROR' })
  | (BaseMessage<FormResponseData> & { type: 'NEW_FORM_RESPONSE' })
  | (BaseMessage<DynamicNotificationData> & {
      type: 'NEW_DYNAMIC_NOTIFICATION';
    });

/** WebSocket message with optional toast notification */
export type WebsocketMessage = Message & {
  toastNotification?: {
    title: string;
    body: string;
  };
};

/** WebSocket log structure */
export interface WebsocketLog {
  timestamp: number;
  message: string;
}

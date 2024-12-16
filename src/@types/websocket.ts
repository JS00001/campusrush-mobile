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
import type { IForm } from './models/form';
import type { IEvent } from './models/event';
import type { IMessage } from './models/message';
import type { IConversation } from './models/conversation';
import type { INotification, NotificationType } from './models/notification';
import type { IFormResponse } from './models/form-response';

import type { IconType } from '@/constants/icons';

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
interface BaseMessage<T extends Payload = any> {
  type: string;
  data: {
    payload?: T;
    notification?: INotification | null;
  };
}

/** All WebSocket message types */
type Message =
  | (BaseMessage<ConversationData> & { type: NotificationType.NewMessage })
  | (BaseMessage<PNMData> & { type: NotificationType.NewPnm })
  | (BaseMessage<EventData> & { type: NotificationType.NewEventResponse })
  | (BaseMessage<MessageErrorData> & { type: NotificationType.MessageError })
  | (BaseMessage<FormResponseData> & { type: NotificationType.NewFormResponse })
  | (BaseMessage & { type: NotificationType.RoleUpdated })
  | (BaseMessage<DynamicNotificationData> & {
      type: NotificationType.NewDynamicNotification;
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

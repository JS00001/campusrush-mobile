/*
 * Created on Sun Sep 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

export enum NotificationType {
  NewMessage = 'NEW_MESSAGE',
  NewPnm = 'NEW_PNM',
  NewEventResponse = 'NEW_EVENT_RESPONSE',
  NewDynamicNotification = 'NEW_DYNAMIC_NOTIFICATION',
  NewFormResponse = 'NEW_FORM_RESPONSE',
  RoleUpdated = 'ROLE_UPDATED',
  MessageError = 'MESSAGE_ERROR',
  Custom = 'CUSTOM',
}

/**
 * All internal fields that are stored about a notification
 */
export interface INotification {
  /** The unique identifier for the message */
  _id: string;
  /** The chapter the message belongs to */
  chapter: string;
  /** The type of notification */
  type: NotificationType;
  /** The title of the notification */
  title: string;
  /** Whether the chapter has read the notification */
  read: boolean;
  /** The payload of the notification */
  data: Record<string, any>;
  /** When the message was created */
  createdAt: Date;
  /** When the message was last updated */
  updatedAt: Date;
}

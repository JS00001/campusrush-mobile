/*
 * Created on Sun Feb 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type {
  ActionMenu,
  IEvent,
  IForm,
  IFormField,
  IFormResponse,
  IPNM,
  IUser,
  IViolation,
} from '@/types';
import type { IconType } from '@/constants/icons';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

export interface BottomSheetProps {
  /** Reference to the bottom sheet */
  innerRef: (ref: BottomSheetModal) => void;
  /** Close the opened bottom sheet */
  close: () => void;
  /** Snap the bottom sheet to a specific index */
  snapToIndex: (index: number) => void;
  /** Snap the bottom sheet to a specific position */
  snapToPosition: (position: string) => void;
}

export type IndividualSheetName = keyof IndividualSheetProps;

export interface IndividualSheetProps {
  /** An action menu sheet */
  ACTION_MENU: ActionMenu;
  /** View information about a chapter */
  CHAPTER: { chapterId: string };
  /** Begin sending a message to a user (or multiple) */
  CREATE_MESSAGE: undefined;
  /** Begin the new event flow */
  CREATE_EVENT: undefined;
  /** Begin the new form flow */
  FORM_EDITOR: { form?: IForm };
  /** Begin the new pnm flow */
  CREATE_PNM: undefined;
  /** Details about a custom phone number */
  CUSTOM_PHONE_NUMBER: undefined;
  /** Create a new user for the chapter */
  MANAGE_USER: { user?: IUser };
  /** Developer tools, only available to admins */
  DEVELOPER_TOOLS: undefined;
  /** A dynamic notification from a websocket event or push notification */
  DYNAMIC_NOTIFICATION: {
    iconName?: IconType;
    iconColor?: string;
    title: string;
    message: string;
  };
  /** View information about an event */
  EVENT: { event: IEvent };
  /** View responses to an event */
  EVENT_RESPONSES: { eventId: string };
  /** View information about a form */
  FORM: { form: IForm };
  /** View all of a forms responses */
  FORM_RESPONSES: { form: IForm };
  /** View a specific form response */
  FORM_RESPONSE: {
    fields: IFormField[];
    response: IFormResponse;
  };
  /** The sub-sheet for creating a form, add a field  */
  MANAGE_FORM_FIELD: {
    field?: IFormField;
    onFieldChange: (field: IFormField) => void;
  };
  /** View information about a pnm */
  PNM: { pnm: IPNM };
  /** Compare billing plans */
  PLAN_COMPARISON: undefined;
  /** View the privacy policy */
  PRIVACY_POLICY: undefined;
  /** Purchase a custom phone number */
  PURCHASE_PHONE_NUMBER: undefined;
  /** Select a number of badge-like tags */
  TAG_SELECTOR: {
    values: string[];
    onTagChange: (tags: string[]) => void;
  };
  /** View the terms of service */
  TERMS_OF_SERVICE: undefined;
  /** Update information about a pnm */
  UPDATE_PNM: { pnm: IPNM };
  /** Update information about an event */
  UPDATE_EVENT: { event: IEvent };
  /** Violations for a chapter */
  VIOLATIONS: { violations: IViolation[] };
}

export interface SheetData<T extends IndividualSheetName> {
  data: IndividualSheetProps[T];
}

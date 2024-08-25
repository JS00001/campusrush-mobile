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

import { IconType } from '@/ui/Icon';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export interface BottomSheetProps {
  /* Reference to the bottom sheet */
  innerRef: (ref: BottomSheetModal) => void;
  /* Close the opened bottom sheet */
  handleClose: () => void;
  /* Snap the bottom sheet to a specific index */
  snapToIndex: (index: number) => void;
  /* Snap the bottom sheet to a specific position */
  snapToPosition: (position: string) => void;
  /* Open a bottom sheet  from the list of registered bottom sheets */
  // prettier-ignore
  openBottomSheet: <T extends IndividualSheetName>(name: T, props?: IndividualSheetProps[T]) => void;
}

export type IndividualSheetName = keyof IndividualSheetProps;

export interface IndividualSheetProps {
  /* View information about a chapter */
  CHAPTER: { chapterId: string };
  /* Begin sending a message to a user (or multiple) */
  CREATE_MESSAGE: undefined;
  /* Begin the new event flow */
  CREATE_EVENT: undefined;
  /* Begin the new pnm flow */
  CREATE_PNM: undefined;
  /** A dynamic notification from a websocket event or push notification */
  DYNAMIC_NOTIFICATION: {
    iconName?: IconType;
    iconColor?: string;
    title: string;
    message: string;
  };
  /* View information about an event */
  EVENT: { eventId: string };
  /* View responses to an event */
  EVENT_RESPONSES: { eventId: string };
  /* View information about a pnm */
  PNM: { pnmId: string };
  /* Compare billing plans */
  PLAN_COMPARISON: undefined;
  /* View the privacy policy */
  PRIVACY_POLICY: undefined;
  /* Select a number of badge-like tags */
  TAG_SELECTOR: {
    values: string[];
    onTagChange: (tags: string[]) => void;
  };
  /* View the terms of service */
  TERMS_OF_SERVICE: undefined;
  /* Update information about a pnm */
  UPDATE_PNM: { pnmId: string };
  /* Update information about an event */
  UPDATE_EVENT: { eventId: string };
}

export interface SheetData<T extends IndividualSheetName> {
  data: IndividualSheetProps[T];
}

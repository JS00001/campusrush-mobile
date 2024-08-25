/*
 * Created on Thu Mar 28 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type { Event } from '@/types';

/** The reference to the extension bottom sheet modal */
export interface ExtensionPanelRef {
  /** Close the extension bottom sheet modal */
  closePanel: () => void;
  /** Open the extension bottom sheet modal */
  openPanel: () => void;
}

/** The properties for the extension bottom sheet modal */
export interface ExtensionPanelProps {
  /** The visibility of the extension bottom sheet modal */
  visible: boolean;
  /** Set the visibility of the extension bottom sheet modal */
  setVisible: (visible: boolean) => void;
  /** Set the attachment of the extension bottom sheet modal */
  setAttachment: (attachment: Event | null) => void;
}

/** The text suggestion for the message box */
export interface TextSuggestion {
  /** The keyword of the text suggestion */
  keyword: string;
  /** The description of the text suggestion */
  description: string;
}

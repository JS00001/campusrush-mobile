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

export interface IAttachments {
  /** The images attached to the message */
  images: string[];
  /** The events attached to the message */
  events: string[];
}

/** The message content thats rendered or sent */
export interface IMessageContent {
  /** The message content */
  content?: string;
  /** The messages attachments */
  attachments: string[];
}

/** The reference to the extension bottom sheet modal */
export interface ExtensionPanelRef {
  /** Close the extension bottom sheet modal */
  closePanel: () => void;
  /** Open the extension bottom sheet modal */
  openPanel: () => void;
}

/** The properties for the extension bottom sheet modal */
export interface ExtensionPanelProps {
  /** The pending attachments */
  pendingAttachments: number;
  /** The attachments */
  attachments: IAttachments;
  /** Set the visibility of the extension bottom sheet modal */
  setVisible: (visible: boolean) => void;
  /** Set the attachment of the extension bottom sheet modal */
  setAttachments: React.Dispatch<React.SetStateAction<IAttachments>>;
  /** Set the number of pending attachments */
  setPendingAttachments: React.Dispatch<React.SetStateAction<number>>;
}

/** The text suggestion for the message box */
export interface TextSuggestion {
  /** The keyword of the text suggestion */
  keyword: string;
  /** The description of the text suggestion */
  description: string;
}

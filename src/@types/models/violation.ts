/*
 * Created on Mon Sep 02 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

export interface IViolation {
  /** The unique identifier for the violation */
  _id: string;
  /** The chapter that committed the violation */
  chapter: string;
  /** The type of violation */
  type: string;
  /** The media ID that caused the violation */
  mediaId: string;
  /** When the message was created */
  createdAt: Date;
  /** When the message was last updated */
  updatedAt: Date;
}

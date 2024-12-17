/*
 * Created on Sun Dec 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { ChapterRole } from './user';

/**
 * All internal fields that are stored about a chapter invite
 */
export interface IChapterInvite {
  /** The unique invite for the user */
  _id: string;
  /** The unique code for the invite */
  code: string;
  /** The email of the user being invited */
  email: string;
  /** The chapter the refresh token belongs to */
  chapter: string;
  /** The role of the invite */
  role: ChapterRole;
  /** When the refresh token was created */
  createdAt: Date;
  /** When the refresh token was last updated */
  updatedAt: Date;
}

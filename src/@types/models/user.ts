/*
 * Created on Mon Nov 18 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

export enum ChapterRole {
  Owner = 'owner',
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer',
}

export enum SystemRole {
  Admin = 'admin',
  User = 'user',
}

export interface IUser {
  /** The id of the user */
  _id: string;
  /** The chapter id of the user */
  chapter: string;
  /** The first name of the user's user */
  firstName: string;
  /** The last name of the user's user */
  lastName: string;
  /** The email of the user's user */
  email: string;
  /** Whether the user has verified their email or not */
  verified: boolean;
  /** The role of the user */
  chapterRole: ChapterRole;
  /** The system role of the user */
  systemRole: SystemRole;
  /** The date the user was last active (last time they hit the API) */
  lastOnline: Date;
  /** The client version that the user is currently on */
  clientVersion: string;
  /** The date the user was created */
  createdAt: Date;
  /** The date the user was last updated */
  updatedAt: Date;

  /** All notifications information for the user */
  notifications: {
    /** Whether the user has enabled push notifications or not */
    enabled: boolean;
  };
}

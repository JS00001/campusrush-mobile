/*
 * Created on Sun Aug 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

/** A PNM is a member of the chapter recruitment */
export interface PNM {
  /** The ID of the PNM */
  _id: string;
  /** The ID of the chapter */
  chapter: string;
  /** The PNMs phone number */
  phoneNumber: string;
  /** The PNMs first name */
  firstName?: string;
  /** The PNMs last name */
  lastName?: string;
  /** The PNMs display name (either their full name, or phone number) */
  displayName: string;
  /** The tags associated with the PNM */
  tags: string[];
  /** The PNMs instagram */
  instagram?: string;
  /** The PNMs snapchat */
  snapchat?: string;
  /** Whether the PNM is starred or not */
  starred: boolean;
  /** The time the PNM was created */
  createdAt: Date;
  /** The time the PNM was last updated */
  updatedAt: Date;
}

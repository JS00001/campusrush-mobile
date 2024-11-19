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

export interface IChapter {
  /** The id of the chapter */
  _id: string;
  /** The name of the chapters organization, IE: Delta Chi */
  name: string;
  /** The name of the chapters owner */
  ownerFirstName: string;
  /** The last name of the chapters owner */
  ownerLastName: string;
  /** The school of the chapter */
  school: string;
  /** The pnms that the chapter has added */
  pnms: string[];
  /** The custom phone number of the chapter (the number that PNMs will message) */
  phoneNumber: string;
  /** Whether the chapter has an active subscription or not */
  isPro: boolean;
  /** The date the chapter was created */
  createdAt: Date;
  /** The date the chapter was last updated */
  updatedAt: Date;
  /** All of the billing information for the chapter */
  billing: {
    /** The Qonversion customer id of the chapter. Set on creation */
    qonversionId: string;
  };

  /** All of the information about the chapters sharing link */
  linkSharing: {
    /** The unique ID for this chapter that PNMs can use to add themselves */
    code: string;
    /** Whether the chapter has enabled link sharing or not */
    enabled: boolean;
  };
}

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

/** A planned event on the calendar for a chapter */
export interface IEvent {
  /** The ID of the event */
  _id: string;
  /** The ID of the chapter */
  chapter: string;
  /** The title of the event */
  title: string;
  /** The description of the event */
  description: string;
  /** The location of the event */
  location: string;
  /** The start date of the event */
  startDate: Date;
  /** The end date of the event */
  endDate: Date;
  /** The number of people who have responded to the event */
  responses: {
    /** How many people responded with yes */
    yes: number;
    /** How many people responded with no */
    no: number;
    /** How many people responded with maybe */
    maybe: number;
  };
  /** The time the event was created */
  createdAt: Date;
  /** The time the event was last updated */
  updatedAt: Date;
}

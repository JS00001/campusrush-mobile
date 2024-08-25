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

import type { PNM } from './pnm';

/** Individual responses to each event */
export interface EventResponse {
  /** The ID of the event response */
  _id: string;
  /** The ID of the event */
  event: string;
  /** The PNM that responded to the event */
  pnm: PNM;
  /** The response of the PNM */
  response: 'yes' | 'no' | 'maybe';
  /** The time the response was created */
  createdAt: Date;
  /** The time the response was last updated */
  updatedAt: Date;
}

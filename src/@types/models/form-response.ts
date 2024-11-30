/*
 * Created on Sat Nov 30 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { IForm } from './form';
import { IPNM } from './pnm';

export interface IFormResponse {
  /** The object id of the event response */
  _id: string;
  /** The PNM that responded */
  pnm: IPNM;
  /** The form that the user responded to */
  form: string | IForm;
  /** The fields and their responses */
  responses: {
    /** Each field gets its api id and its value */
    [id: string]: string | boolean;
  };
  /** When the event response was created */
  createdAt: Date;
  /** When the event response was last updated */
  updatedAt: Date;
}

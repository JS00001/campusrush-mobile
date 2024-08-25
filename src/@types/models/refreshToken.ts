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

/** Individual refresh token session information for a chapter */
export interface RefreshToken {
  /** The ID of the refresh token */
  _id: string;
  /** The ID of the chapter */
  chapter: string;
  /** The device type the session started on */
  deviceType: string;
  /** The IP address the session started on */
  ipAddress: string;
  /** The location the session started in */
  location: string;
  /** When the session started */
  createdAt: Date;
  /** When the session was last updated */
  updatedAt: Date;
}

/*
 * Created on Wed Feb 28 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

/** Privacy policy information from the CMS */
export interface PrivacyPolicy {
  /** The ID of the privacy policy */
  id: number;
  /** The content of the privacy policy */
  content: string;
  /** The date the privacy policy was created */
  date_created: Date;
  /** The date the privacy policy was last updated */
  date_updated: Date | null;
}

/** Terms of service information from the CMS */
export interface TermsOfService {
  /** The ID of the terms of service */
  id: number;
  /** The content of the terms of service */
  content: string;
  /** The date the terms of service was created */
  date_created: Date;
  /** The date the terms of service was last updated */
  date_updated: Date | null;
}

/*
 * Created on Wed Nov 8 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

/** The details about all entitlements that we offer */
export interface EntitlementDetails {
  /** The configurable limits of CampusRush pro */
  limits: {
    /** he maximum number of PNMs that a user can have. */
    maxPnmCount: number;
    /** The cooldown for sending a mass message (any message to more than 1 PNM) */
    massMessageCooldown: number;
  };
  /** The perks of CampusRush pro (for display on the paywall) */
  perks: {
    /** Directly on the paywall */
    featured: {
      /** The title of the feature */
      title: string;
      /** The description of the feature */
      description: string;
      /** The icon name, MUST BE a remix icon (not including the ri- prefix) */
      icon: string;
    }[];
    /** When 'View All Perks' is clicked */
    all: {
      /** The title of the feature */
      title: string;
      /** The description of the feature */
      description: string;
      /** The value of the feature */
      value: string | number | boolean;
    }[];
  };
}

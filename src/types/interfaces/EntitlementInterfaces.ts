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

export type Entitlement = 'basic' | 'pro';

export type ProductId = 'basicsubscription1' | 'prosubscription1';

export type ProductPerkIds =
  | 'max_pnm_count'
  | 'mass_message_cooldown'
  | 'custom_phone_number'
  | 'favorite_pnm'
  | 'pnm_statistics'
  | 'unlimited_individual_messages'
  | 'mass_message'
  | 'mass_message_uncontacted'
  | 'mass_message_favorites'
  | 'add_pnm_manually'
  | 'add_pnm_from_qr';

export interface EntitlementDetails {
  productPerks: {
    [key in ProductPerkIds]: {
      /**
       * The name of the perk.
       */
      name: string;
      /**
       * A description of the perk.
       */
      description: string;
      /**
       * Whether or not the perk is active or coming soon.
       */
      active: boolean;
    };
  };
  products: {
    [key in ProductId]: {
      /**
       * The display name of the plan.
       */
      DISPLAY_NAME: string;
      /**
       * A list of all the perks and the access that this plan has to them.
       */
      ALL_PERKS: {
        [key in ProductPerkIds]: boolean | number | string;
      };
      /**
       * A string list of featured perks that the plan has.
       */
      FEATURED_PERKS: {
        /**
         * The name of the perk.
         */
        name: string;
        /**
         * A description of the perk.
         */
        description: string;
        /**
         * Whether or not the perk is active or coming soon.
         */
        active: boolean;
      }[];
    };
  };
  entitlements: {
    [key in Entitlement]: {
      /**
       * The weight of the plan. This determines if the user can upgrade to a higher plan.
       */
      WEIGHT: number;
      /**
       * The maximum number of PNM's that a user can have.
       */
      MAX_PNM_COUNT: number;
      /**
       * The cooldown for sending a mass message (any message to more than 1 PNM)
       */
      MASS_MESSAGE_COOLDOWN: number;
      /**
       * A list of elements that are paywalled for this plan.
       */
      PAYWALLED_ELEMENTS: string[];
    };
  };
}

/*
 * Created on Sat Aug 19 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import ExpoConstants from "expo-constants";

const AppConstants = {
  /**
   * The version of the app
   */
  version: ExpoConstants.expoConfig?.version,

  /**
   * The public key to initialize revenue cat
   */
  revenueCatPublicKey: ExpoConstants.expoConfig?.extra?.revenueCat?.publicKey,

  /**
   * The keywords to custom style in messages and their descriptions
   */
  messagingKeywords: [
    {
      keyword: "@firstname",
      description: "Will be replaced with first name of the PNM",
    },
    {
      keyword: "@lastname",
      description: "Will be replaced with last name of the PNM",
    },
    {
      keyword: "@fullname",
      description: "Will be replaced with full name of the PNM",
    },
    {
      keyword: "@phonenumber",
      description: "Will be replaced with phone number of the PNM",
    },
  ],

  /**
   *  All locally stored user preferences with their default values
   */
  preferences: {
    /**
     * Whether user has seen the "tutorial" tooltip telling a user to type "@" to see text replacements
     */
    messagingTooltipSeen: false,
  },
};

export default AppConstants;

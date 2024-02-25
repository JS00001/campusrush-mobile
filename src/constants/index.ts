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

import ExpoConstants from 'expo-constants';
import RNTestFlight from 'react-native-test-flight';

// Whether or not we are in a production environment
const isProduction = !__DEV__ && !RNTestFlight.isTestFlight;

// Staging URLs
export const STAGING_URL = 'https://greek-api.in-staging.space';
export const STAGING_WEB_URL = 'https://campusrush.in-staging.space';
export const STAGING_WEBSOCKET_URL = 'wss://greek-api.in-staging.space';

// Production URLs
export const PRODUCTION_WEB_URL = 'https://campusrush.app';
export const PRODUCTION_URL = 'https://api.campusrush.app';
export const PRODUCTION_WEBSOCKET_URL = 'wss://api.campusrush.app';

// Endpoints for the web
export const SHARING_URL = '/sharing';
export const EVENT_URL = '/events';

const AppConstants = {
  /**
   * Whether or not we are in a production environment
   */
  isProduction,
  /**
   * The version of the app
   */
  version: ExpoConstants.expoConfig?.version,
  /**
   * The build number of the app
   */
  buildNumber: ExpoConstants.expoConfig?.extra?.buildNumber,
  /**
   * The public key to initialize revenue cat
   */
  revenueCatPublicKey: ExpoConstants.expoConfig?.extra?.revenueCat?.publicKey,
  /**
   * The DSN to initialize sentry
   */
  sentryDsn: ExpoConstants.expoConfig?.extra?.sentry?.dsn,
  /**
   * The Posthog api key
   */
  posthogApiKey: ExpoConstants.expoConfig?.extra?.posthog?.apiKey,
  /**
   * The url to the posthog instance
   */
  posthogUrl: ExpoConstants.expoConfig?.extra?.posthog?.url,
  /**
   * The API url for the backend
   */
  apiUrl: isProduction ? PRODUCTION_URL : STAGING_URL,
  /**
   * The website url
   */
  webUrl: isProduction ? PRODUCTION_WEB_URL : STAGING_WEB_URL,
  /**
   * The websocket url for the backend
   */
  websocketUrl: isProduction ? PRODUCTION_WEBSOCKET_URL : STAGING_WEBSOCKET_URL,
  /**
   * The url to sharing
   */
  sharingUrl: isProduction
    ? PRODUCTION_WEB_URL + SHARING_URL
    : STAGING_WEB_URL + SHARING_URL,
  /**
   * The url to events
   */
  eventUrl: isProduction
    ? PRODUCTION_WEB_URL + EVENT_URL
    : STAGING_WEB_URL + EVENT_URL,
  /**
   * The CMS/content url
   */
  contentUrl: 'https://content.campusrush.app',
  /**
   * The keywords to custom style in messages and their descriptions
   */
  messagingKeywords: [
    {
      keyword: '@firstname',
      description: 'Will be replaced with first name of the PNM',
    },
    {
      keyword: '@lastname',
      description: 'Will be replaced with last name of the PNM',
    },
    {
      keyword: '@fullname',
      description: 'Will be replaced with full name of the PNM',
    },
    {
      keyword: '@phonenumber',
      description: 'Will be replaced with phone number of the PNM',
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

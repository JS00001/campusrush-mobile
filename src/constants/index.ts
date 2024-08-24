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

import PackageJSON from '../../package.json';

type Environment = 'development' | 'staging' | 'production';

// Get the current environment of the app
const environment = (() => {
  if (__DEV__) {
    return 'development';
  } else if (RNTestFlight.isTestFlight) {
    return 'staging';
  } else {
    return 'production';
  }
})() as Environment;

// All urls for all environments
const urls = {
  development: {
    apiUrl: 'https://donkey-pretty-initially.ngrok-free.app',
    webUrl: 'http://localhost:3001',
    websocketUrl: 'wss://donkey-pretty-initially.ngrok-free.app',
  },
  staging: {
    apiUrl: 'https://greek-api.in-staging.space',
    webUrl: 'https://campusrush-forms.in-staging.space',
    websocketUrl: 'wss://greek-api.in-staging.space',
  },
  production: {
    apiUrl: 'https://api.campusrush.app',
    webUrl: 'https://forms.campusrush.app',
    websocketUrl: 'wss://api.campusrush.app',
  },
}[environment];

// Endpoints for the web
export const SHARING_URL = '/sharing';
export const EVENT_URL = '/events';

const AppConstants = {
  /**
   * The current environment of the app
   */
  environment,
  /**
   * The app store URL for the app
   */
  appStoreUrl:
    'https://apps.apple.com/us/app/campus-rush-recruitment/id6462791621',
  /**
   * The version of the app (Only changes during builds)
   */
  version: ExpoConstants.expoConfig?.version,
  /**
   * The build number of the app
   */
  buildNumber: ExpoConstants.expoConfig?.extra?.buildNumber,
  /**
   * The sub-version of the app
   */
  subVersion: PackageJSON.version,
  /**
   * The project key used to initialize qonversion
   */
  qonversionProjectKey: ExpoConstants.expoConfig?.extra?.qonversion?.projectKey,
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
  apiUrl: urls.apiUrl,
  /**
   * The website url
   */
  webUrl: urls.webUrl,
  /**
   * The websocket url for the backend
   */
  websocketUrl: urls.websocketUrl,
  /**
   * The url to sharing
   */
  sharingUrl: urls.webUrl + SHARING_URL,
  /**
   * The url to events
   */
  eventUrl: urls.webUrl + EVENT_URL,
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
    /**
     * Whether the user has finished the onboarding process
     */
    onboardingComplete: false,
    /**
     * The last time the user was alerted to update the app
     */
    lastUpdateAlert: 0,
  },
};

export default AppConstants;

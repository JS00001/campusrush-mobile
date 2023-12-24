/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import AppConstants from '@/constants';

/**
 * The base URLs for routes
 */

// The URL of the API for development
export const STAGING_URL = 'https://greek-api.in-staging.space';

// The URL of the API for production
export const PRODUCTION_URL = 'https://api.campusrush.app';

// The URL for the web app for development
export const STAGING_WEB_URL = 'https://greek-web.in-staging.space/sharing';

// The URL for the web app for production
export const PRODUCTION_WEB_URL = 'https://campusrush.app/external';

// The URL for the websocket for development
export const STAGING_WEBSOCKET_URL = 'wss://greek-api.in-staging.space';

// The URL for the websocket for production
export const PRODUCTION_WEBSOCKET_URL = 'wss://api.campusrush.app';

// The URL for content
export const CONTENT_URL = 'https://content.campusrush.app';

// Which API URL should be used, staging for development, production for release
// prettier-ignore
export const BASE_URL = AppConstants.isProduction ? PRODUCTION_URL : STAGING_URL;

// Which web sharing URL should be used, staging for development, production for release
// prettier-ignore
export const WEB_URL = AppConstants.isProduction ? PRODUCTION_WEB_URL : STAGING_WEB_URL;

// Which websocket URL should be used, staging for development, production for release
// prettier-ignore
export const WEBSOCKET_URL = AppConstants.isProduction ? PRODUCTION_WEBSOCKET_URL : STAGING_WEBSOCKET_URL;

/**
 * The URLS for web routes
 */
export const SHARING_URL = `${WEB_URL}/sharing`;
export const EVENT_URL = `${WEB_URL}/event`;

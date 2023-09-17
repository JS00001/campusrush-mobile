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

// The URL of the API for development
export const STAGING_URL = 'https://greek-api.in-staging.space';

// The URL of the API for production
export const PRODUCTION_URL = 'https://api.campusrush.app';

// Which API URL should be used, staging for development, production for release
export const BASE_URL = __DEV__ ? STAGING_URL : PRODUCTION_URL;

// The URL of the API for authentication routes
export const AUTH_VERSION_URL = `${BASE_URL}/auth/v1`;

// The URL of the rest of the API routes
export const API_VERSION_URL = `${BASE_URL}/api/v1`;

// The URL of the Admin API routes
export const ADMIN_VERSION_URL = `${BASE_URL}/admin/v1`;

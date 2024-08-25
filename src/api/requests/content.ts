/*
 * Created on Fri Feb 23 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import 'react-native-url-polyfill/auto';
import { createDirectus, rest, readSingleton } from '@directus/sdk';

import type { TermsOfService, PrivacyPolicy } from '@/types';

import AppConstants from '@/constants';

const client = createDirectus(AppConstants.contentUrl).with(rest());

/**
 * Get the terms of service from the CMS
 */
export const getTermsOfService = async () => {
  const collectionName = 'terms_of_service';

  return client.request(
    readSingleton(collectionName),
  ) as Promise<TermsOfService>;
};

/**
 * Get the privacy policy from the CMS
 */
export const getPrivacyPolicy = async () => {
  const collectionName = 'privacy_policy';

  return client.request(
    readSingleton(collectionName),
  ) as Promise<PrivacyPolicy>;
};

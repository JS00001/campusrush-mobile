/*
 * Created on Tue Nov 14 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import 'react-native-url-polyfill/auto';
import { createDirectus, rest, readSingleton } from '@directus/sdk';

import { CONTENT_URL } from '@/api/constants';

const client = createDirectus(CONTENT_URL).with(rest());

/**
 * Get the terms of service from the CMS
 */
const getTermsOfService = async (): Promise<TermsOfService> => {
  const collectionName = 'terms_of_service';

  return client.request(
    readSingleton(collectionName),
  ) as Promise<TermsOfService>;
};

/**
 * Get the privacy policy from the CMS
 */
const getPrivacyPolicy = async (): Promise<PrivacyPolicy> => {
  const collectionName = 'privacy_policy';

  return client.request(
    readSingleton(collectionName),
  ) as Promise<PrivacyPolicy>;
};

export default {
  getTermsOfService,
  getPrivacyPolicy,
};

/*
 * Created on Wed Mar 06 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import {
  QonversionConfigBuilder,
  LaunchMode,
  Environment,
} from 'react-native-qonversion';

import AppConstants from '@/constants';

const environment =
  AppConstants.environment === 'production'
    ? Environment.PRODUCTION
    : Environment.SANDBOX;

/**
 * The configuration for the qonversion SDK
 */
const qonversionConfig = new QonversionConfigBuilder(
  AppConstants.qonversionProjectKey,
  LaunchMode.SUBSCRIPTION_MANAGEMENT,
)
  .setEnvironment(environment)
  .setEntitlementsUpdateListener({
    onEntitlementsUpdated: (entitlements) => {},
  })
  .build();

export default qonversionConfig;

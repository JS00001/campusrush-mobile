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

import AppConstants from '@/constants';
import { QonversionConfigBuilder, LaunchMode } from 'react-native-qonversion';

/**
 * The configuration for the qonversion SDK
 */
const qonversionConfig = new QonversionConfigBuilder(
  AppConstants.qonversionProjectKey,
  LaunchMode.SUBSCRIPTION_MANAGEMENT,
).build();

export default qonversionConfig;

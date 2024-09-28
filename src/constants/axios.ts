/*
 * Created on Sat Sep 28 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import * as Device from 'expo-device';

import AppConstants from '@/constants';

const defaultHeaders = {
  'X-Device-Type': Device.modelName,
  'X-Device-OS': Device.osName,
  'X-Client-Version': AppConstants.version,
};

export default defaultHeaders;

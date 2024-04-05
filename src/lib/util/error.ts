/*
 * Created on Fri Apr 05 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import * as Sentry from '@sentry/react-native';

export const handle = async (fn: any) => {
  try {
    return await fn();
  } catch (error) {
    Sentry.captureException(error);
  }
};

/*
 * Created on Fri Jun 07 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */
import { logger as RNLogger } from 'react-native-logs';

export type LogLevels = 'debug' | 'info' | 'warn' | 'error';

// TODO: Add file transport that can be viewed
export const logger = RNLogger.createLogger<LogLevels>({
  async: false,
  printDate: false,
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  transportOptions: {
    colors: {
      debug: 'gray',
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
    extensionColors: {
      Websocket: 'magentaBright',
    },
  },
});

export const websocketLogger = logger.extend('Websocket');

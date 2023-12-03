/*
 * Created on Thu Nov 30 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */
import * as Sentry from "sentry-expo";

import AppConstants from "@/constants";

const SentryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  Sentry.init({
    dsn: AppConstants.sentryDsn,
    enableInExpoDevelopment: true,
    environment: __DEV__ ? "dev" : "prod",
  });

  return children;
};

export default SentryProvider;

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

import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Updates from "expo-updates";
import * as Sentry from "@sentry/react-native";

import AppConstants from "@/constants";

const SentryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  Sentry.init({
    dsn: AppConstants.sentryDsn,
    enabled: !__DEV__,
    environment: __DEV__ ? "dev" : "prod",
  });

  Sentry.setExtras({
    manifest: Updates.manifest,
    deviceYearClass: Device.deviceYearClass,
    linkingUri: Constants.linkingUri,
  });

  return children;
};

export default SentryProvider;

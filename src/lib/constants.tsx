/*
 * Created on Sat Aug 19 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import ExpoConstants from "expo-constants";

const AppConstants = {
  version: ExpoConstants.expoConfig?.version,
  revenueCatPublicKey: ExpoConstants.expoConfig?.extra?.revenueCat?.publicKey,
};

export default AppConstants;

/*
 * Created on Sun Dec 03 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */
import { Alert } from 'react-native';
import { useState, useEffect } from 'react';

import AppConstants from '@/constants';
import { stringifyVersion } from '@/lib/util/string';
import { useGetVersion } from '@/hooks/api/external';

const useVersioning = () => {
  const [isValidVersion, setIsValidVersion] = useState(true);

  const query = useGetVersion();

  useEffect(() => {
    if (!query.data || 'error' in query.data) return;

    const validClients = parseInt(
      stringifyVersion(query.data.data.version || '0.0.0'),
    );
    const currentVersion = parseInt(
      stringifyVersion(AppConstants.version || '0.0.0'),
    );

    if (currentVersion === 0 || validClients === 0) {
      setIsValidVersion(true);
      return;
    }

    if (validClients > currentVersion) {
      setIsValidVersion(false);
      return;
    }

    setIsValidVersion(true);
  }, [query.data]);

  const forceUpdateAlert = () => {
    Alert.alert(
      'Update Required',
      'Please update your app to the latest version',
      [
        {
          text: 'OK',
          onPress: () => {
            if (!isValidVersion) {
              forceUpdateAlert();
            }
          },
        },
      ],
    );
  };

  return {
    ...query,
    isValidVersion,
    forceUpdateAlert,
  };
};

export default useVersioning;

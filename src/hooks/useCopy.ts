/*
 * Created on Mon Dec 25 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

const useCopy = () => {
  const copy = (value: string, label?: string) => {
    label = label || 'Value';

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Clipboard.setStringAsync(value);

    Toast.show({
      type: 'success',
      text1: `${label} copied to clipboard`,
      text2: value,
      visibilityTime: 2000,
    });
  };

  return copy;
};

export default useCopy;

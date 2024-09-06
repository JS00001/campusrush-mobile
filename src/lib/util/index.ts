/*
 * Created on Tue Dec 26 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { Alert, AlertButton } from 'react-native';

interface AsyncAlertButton extends AlertButton {
  id?: string;
}

interface AlertProps {
  title: string;
  message: string;
  buttons?: AsyncAlertButton[];
}

/**
 * Alerts the user with a message.
 */
export const alert = ({ title, message, buttons }: AlertProps) => {
  return new Promise((resolve) => {
    const asyncButtons: AsyncAlertButton[] =
      buttons?.map((button, index) => {
        const id = button.id || index.toString();
        return {
          ...button,
          id: id,
          onPress: () => {
            button.onPress?.();
            resolve(id);
          },
        };
      }) || [];

    Alert.alert(title, message, asyncButtons);
  });
};

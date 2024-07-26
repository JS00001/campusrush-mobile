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

interface AlertProps {
  title: string;
  message: string;
  buttons?: AlertButton[];
}

/**
 * Waits for a specified amount of time when
 * awaited in an async function.
 */
export const waitFor = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Alerts the user with a message.
 */
export const alert = ({ title, message, buttons }: AlertProps) => {
  Alert.alert(title, message, buttons);
};

/*
 * Created on Mon Nov 6 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const customAsyncStorage = {
  getItem: async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (key: string, value: string) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  },
  removeItem: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
} as unknown;

export default customAsyncStorage;

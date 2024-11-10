/*
 * Created on Sat Nov 09 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const MemoryStorage = (tokenName: string) => {
  let token: string | null = null;

  return {
    setToken: (newToken: string | null) => {
      token = newToken;
      AsyncStorage.setItem(tokenName, newToken || '');
    },
    getToken: async () => {
      if (token) {
        return token;
      }

      return (await AsyncStorage.getItem(tokenName)) || null;
    },
  };
};

const refreshTokenStorage = MemoryStorage('refreshToken');
const accessTokenStorage = MemoryStorage('accessToken');

export const getRefreshToken = refreshTokenStorage.getToken;
export const setRefreshToken = refreshTokenStorage.setToken;

export const getAccessToken = accessTokenStorage.getToken;
export const setAccessToken = accessTokenStorage.setToken;

export const isLoggedIn = async () => {
  const token = await getAccessToken();
  return !!token;
};

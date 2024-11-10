/*
 * Created on Sun Oct 27 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import * as Device from 'expo-device';
import Axios, { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';

import type { API } from '@/types';

import { httpLogger } from '@/lib/logger';
import { getAccessToken } from '@/lib/auth';
import AppConstants, { Urls } from '@/constants';

const defaultHeaders = {
  'X-Device-Type': Device.modelName,
  'X-Device-OS': Device.osName,
  'X-Client-Version': AppConstants.version,
};

const axios = Axios.create({
  baseURL: `${Urls.ApiURL}/api/v1/consumer`,
  headers: {
    ...defaultHeaders,
  },
});

/**
 * Request interceptor
 */
axios.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();

  httpLogger.debug(config.method?.toUpperCase(), config.url);

  if (accessToken && !config.headers.Authorization) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

/**
 * Response interceptor
 */
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const responseData = error.response?.data as API.ErrorResponse;
    const errorDetails = (error.response?.data as API.ErrorResponse).error;

    /**
     * If we *successfully* handle a common error, we want to return the
     * response. This is so we dont have to use catch blocks in every
     * API call. Instead, we can add a check for errors:
     */
    const errorHandledResponse = {
      data: responseData,
    };

    /** 429 - RATE_LIMIT_EXCEEDED */
    if (errorDetails.message === 'RATE_LIMIT_EXCEEDED') {
      Toast.show({
        type: 'error',
        text1: 'Too many requests',
        text2: 'Please try again later',
      });

      return Promise.resolve(errorHandledResponse);
    }

    /** 401 - EXPIRED_TOKEN */
    if (errorDetails.message === 'EXPIRED_TOKEN') {
      // TODO: Add retry logic
      return Promise.resolve(errorHandledResponse);
    }

    /** 401 - UNAUTHORIZED */
    if (errorDetails.message === 'UNAUTHORIZED') {
      // TODO:
      return Promise.resolve(errorHandledResponse);
    }

    /** 403 - MAXIMUM_ENTITLEMENT_LIMIT_REACHED */
    if (errorDetails.message === 'ENTITLEMENT_LIMIT_REACHED') {
      alert({
        title: 'Limit Reached',
        message: errorDetails.humanMessage,
      });

      return Promise.resolve(errorHandledResponse);
    }

    /** ANY STATUS CODE - If there is NO 'field' key, we need to display the error in a toast */
    if (!errorDetails.field) {
      Toast.show({
        type: 'error',
        text1: 'An error occurred',
        text2: errorDetails.humanMessage,
      });

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default axios;

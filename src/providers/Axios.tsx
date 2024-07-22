/*
 * Created on Sat Aug 12 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useEffect } from "react";
import Toast from "react-native-toast-message";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

import AppConstants from "@/constants";
import { useModalStore } from "@/store";
import { httpLogger } from "@/lib/logger";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import { useNetwork } from "@/providers/Network";

interface AxiosInterceptorProps {
  children?: React.ReactNode;
}

const axiosClient = axios.create({
  baseURL: AppConstants.apiUrl,
});

const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  const { openModal } = useModalStore();
  const { verifyConnection } = useNetwork();
  const { accessToken, clearUserData } = useAuth();

  useEffect(() => {
    /**
     * All axios requests run through this interceptor, we
     * add an authorization header if the user is logged in
     */
    const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
      const controller = new AbortController();
      const isInternetReachable = await verifyConnection();

      httpLogger.debug(config.method?.toUpperCase(), config.url);

      if (!isInternetReachable) {
        controller.abort();
      }

      if (accessToken && !config.headers.Authorization) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    };

    /**
     * We handle request errors such as no internet connection,
     * here
     */
    const requestErrorInterceptor = (error: AxiosError) => {
      return Promise.reject(error);
    };

    /**
     * All axios responses run through this interceptor, we
     * handle known API errors here, and pass the rejections down
     */
    const responseErrorInterceptor = (error: AxiosError) => {
      const responseData = error.response?.data as API.ErrorResponse;
      const errorDetails = (error.response?.data as API.ErrorResponse).error;

      /**
       * If we *successfully* handle a common error, we want to return the
       * response. This is so we dont have to use catch blocks in every
       * API call. Instead, we can add a check for errors:
       * if ('error' in response) return;
       */
      const errorHandledResponse = {
        data: responseData,
      };

      /** 429 - RATE_LIMIT_EXCEEDED */
      if (errorDetails.message === "RATE_LIMIT_EXCEEDED") {
        Toast.show({
          type: "error",
          text1: Content.rateLimitError.title,
          text2: Content.rateLimitError.message,
        });

        return Promise.resolve(errorHandledResponse);
      }

      /** 401 - EXPIRED_TOKEN */
      if (errorDetails.message === "EXPIRED_TOKEN") {
        // TODO: Add retry logic
        return Promise.resolve(errorHandledResponse);
      }

      /** 401 - UNAUTHORIZED */
      if (errorDetails.message === "UNAUTHORIZED") {
        clearUserData();

        return Promise.resolve(errorHandledResponse);
      }

      /** 403 - NO_ENTITLEMENTS */
      if (errorDetails.message === "NO_ENTITLEMENTS") {
        // TODO: manage this error
        return Promise.resolve(errorHandledResponse);
      }

      /** 403 - MAXIMUM_ENTITLEMENT_LIMIT_REACHED */
      if (errorDetails.message === "ENTITLEMENT_LIMIT_REACHED") {
        openModal("warning", {
          title: "Limit Reached",
          subtitle: errorDetails.humanMessage,
          primaryActionLabel: "Go Back",
        });

        return Promise.resolve(errorHandledResponse);
      }

      /** ANY STATUS CODE - If there is NO 'field' key, we need to display the error in a toast */
      if (!errorDetails.field) {
        Toast.show({
          type: "error",
          text1: "An error occurred",
          text2: errorDetails.humanMessage,
        });

        return Promise.reject(error);
      }

      return Promise.reject(error);
    };

    /**
     * Create the interceptors on the axios client, and
     * remove them when the component is unmounted
     */
    const responseInterceptors = axiosClient.interceptors.response.use(
      (response) => response,
      responseErrorInterceptor,
    );

    const requestInterceptors = axiosClient.interceptors.request.use(
      requestInterceptor,
      requestErrorInterceptor,
    );

    return () => {
      axiosClient.interceptors.response.eject(responseInterceptors);
      axiosClient.interceptors.request.eject(requestInterceptors);
    };
  }, [accessToken]);

  return children;
};

export { axiosClient };

export default AxiosInterceptor;

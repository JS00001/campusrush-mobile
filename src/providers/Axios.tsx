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

import AppConstants from "@/constants";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import useModalsStore from "@/statev1/modals";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface AxiosInterceptorProps {
  children?: React.ReactNode;
}

const axiosClient = axios.create({
  baseURL: AppConstants.apiUrl,
});

const AxiosInterceptor: React.FC<AxiosInterceptorProps> = ({ children }) => {
  const { openModal } = useModalsStore();
  const { accessToken, clearUserData } = useAuth();

  useEffect(() => {
    /**
     * All axios requests run through this interceptor, we
     * add an authorization header if the user is logged in
     */
    const requestInterceptor = (config: InternalAxiosRequestConfig) => {
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
      const data = (error.response?.data as API.ErrorResponse).error;

      /** 429 - RATE_LIMIT_EXCEEDED */
      if (data.message === "RATE_LIMIT_EXCEEDED") {
        Toast.show({
          type: "error",
          text1: Content.rateLimitError.title,
          text2: Content.rateLimitError.message,
        });

        return;
      }

      /** 401 - EXPIRED_TOKEN */
      if (data.message === "EXPIRED_TOKEN") {
        // TODO: Add retry logic
        return;
      }

      /** 401 - UNAUTHORIZED */
      if (data.message === "UNAUTHORIZED") {
        clearUserData();
        return;
      }

      /** 403 - NO_ENTITLEMENTS */
      if (data.message === "NO_ENTITLEMENTS") {
        // TODO: manage this error
        return;
      }

      /** 403 - MISSING_ENTITLEMENT */
      if (data.message === "MISSING_ENTITLEMENT") {
        openModal({
          name: "WARNING",
          props: {
            title: Content.missingEntitlementError.message,
            primaryButtonText: Content.missingEntitlementError.primaryButton,
            secondaryButtonText:
              Content.missingEntitlementError.secondaryButton,
          },
        });
        return;
      }

      /** 403 - UPGRADABLE_ENTITLEMENT_LIMIT_REACHED */
      if (data.message === "UPGRADABLE_ENTITLEMENT_LIMIT_REACHED") {
        openModal({
          name: "UPGRADE",
          props: { subtitle: data.humanMessage },
        });
        return;
      }

      /** 403 - MAXIMUM_ENTITLEMENT_LIMIT_REACHED */
      if (data.message === "MAXIMUM_ENTITLEMENT_LIMIT_REACHED") {
        openModal({
          name: "WARNING",
          props: {
            title: "Limit Reached",
            subtitle: data.humanMessage,
            primaryButtonText: "Go Back",
          },
        });
        return;
      }

      /** ANY STATUS CODE - If there is NO 'field' key, we need to display the error in a toast */
      if (!data.field) {
        Toast.show({
          type: "error",
          text1: "An error occurred",
          text2: data.humanMessage,
        });

        return;
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

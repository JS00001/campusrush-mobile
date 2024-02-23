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

import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import { BASE_URL } from "@/api/constants";
import useModalsStore from "@/state/modals";

interface AxiosConfig extends InternalAxiosRequestConfig {
  retryCount?: number;
}

interface AxiosErrorConfig extends AxiosError {
  config: AxiosConfig;
}

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

const AxiosIntercepter: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const { accessToken, clearUserData } = useAuth();

  // Store to open a modal, used to show modals to upgrade
  const { openModal } = useModalsStore();

  useEffect(() => {
    // Add an access token to the request headers
    const requestInterceptor = (config: AxiosConfig) => {
      if (accessToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    };

    // Handle request errors
    const requestErrInterceptor = (error: AxiosError) => {
      return Promise.reject(error);
    };

    // Add the two interceptors to the axios client
    const reqInterceptor = axiosClient.interceptors.request.use(
      requestInterceptor,
      requestErrInterceptor,
    );

    const responseInterceptor = (response: AxiosResponse<any, any>) => {
      return response;
    };

    const responseErrInterceptor = async (error: AxiosErrorConfig) => {
      // If error is not an unauthorized or rate limit error, or entitlement error, reject the promise
      if (
        error.response?.status != 401 &&
        error.response?.status != 429 &&
        error.response?.status != 403
      ) {
        return Promise.reject(error);
      }

      // If the error is a rate limit error, show a toast message
      if (error.response?.status == 429) {
        Toast.show({
          type: "error",
          text1: Content.rateLimitError.title,
          text2: Content.rateLimitError.message,
        });

        return Promise.reject(error);
      }

      // Intercept errors and handle common ones
      const responseData: any = error.response?.data;

      // If the error is an unauthorized error, try to refresh the access token
      if (responseData.error?.message == "EXPIRED_TOKEN") {
        if (!error.config) {
          return Promise.reject(error);
        }

        const config: AxiosConfig = {
          ...error.config,
          retryCount: error.config.retryCount ? error.config.retryCount + 1 : 1,
        };

        if (config.retryCount && config.retryCount > 1) {
          return Promise.reject(error);
        }

        return await axiosClient.request(config);
      }

      // If the user is not logged in, clear the user data
      if (responseData.error?.message == "UNAUTHORIZED") {
        clearUserData();
        return Promise.reject(error);
      }

      // If the user has NO entitlements, they should not be able to use the app
      if (responseData.error?.message == "NO_ENTITLEMENTS") {
        // refetchBillingData();
        return Promise.reject(error);
      }

      // If the user is missing an entitlement, it means they need to upgrade their subscription to use a feature
      if (responseData.error?.message == "MISSING_ENTITLEMENT") {
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

      // If the has reached a limit on their entitlements, they need to upgrade their subscription
      // prettier-ignore
      if (responseData.error?.message == "UPGRADABLE_ENTITLEMENT_LIMIT_REACHED") {
        openModal({
          name: "UPGRADE",
          props: {
            subtitle: responseData.error?.humanMessage || "",
          }
        })

        return;
      }

      // If the user has reached the maximum limit on their entitlements, and there is no upgrade available, they cant upgrade
      // prettier-ignore
      if (responseData.error?.message == "MAXIMUM_ENTITLEMENT_LIMIT_REACHED") {
        openModal({
          name: "WARNING",
          props: {
            title: 'Limit Reached',
            subtitle: responseData.error?.humanMessage || "",
            primaryButtonText: "Go Back",
            primaryButtonAction: () => undefined,
          },
        })

        return;
      }

      return Promise.reject(error);
    };

    const resInterceptor = axiosClient.interceptors.response.use(
      responseInterceptor,
      responseErrInterceptor,
    );

    // Remove the interceptors when the component unmounts
    return () => {
      axiosClient.interceptors.request.eject(reqInterceptor);
      axiosClient.interceptors.response.eject(resInterceptor);
    };
  }, [accessToken]);

  return <>{children}</>;
};

export default AxiosIntercepter;
export { axiosClient };

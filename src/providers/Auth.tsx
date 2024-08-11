/*
 * Created on Wed Mar 06 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import axios from "axios";
import * as Device from "expo-device";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Qonversion, { UserPropertyKey } from "react-native-qonversion";
import { createContext, useEffect, useState, useContext } from "react";

import AppConstants from "@/constants";
import { useGlobalStore } from "@/store";
import { useQonversion } from "@/providers/Qonversion";

interface IUserData {
  chapter: Chapter;
  accessToken: string | null;
  refreshToken: string | null;
}

interface IAuthContext {
  /** Whether the initial auth data is still being fetched */
  isLoading: boolean;
  /** All of the mutations in this context's data */
  mutations: Record<string, UseMutationResult<any, any, any, any>>;
  /** The currently logged in chapter */
  chapter: Chapter;
  /** The currently logged in chapter's access token */
  accessToken: string | null;
  /** The currently logged in chapter's refresh token */
  refreshToken: string | null;
  /** Clear all caches and local user data */
  clearUserData: () => void;
  /** Set the currently logged in chapter */
  setChapter: (chapter: Chapter) => void;
  /** Log the user out and clear all user data */
  logoutUser: () => Promise<void>;
  /** Authenticate a user with the given data */
  authenticateUser: (data: IUserData) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const globalStore = useGlobalStore();
  const { checkEntitlements } = useQonversion();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<IUserData>({
    accessToken: null,
    refreshToken: null,
    chapter: {} as Chapter,
  });

  const logoutMutation = useMutation({
    mutationFn: async (refreshToken: string) => {
      const { data } = await axios.post(
        `${AppConstants.apiUrl}/api/v1/consumer/auth/logout`,
        {},
        {
          headers: {
            "User-Agent": Device.modelName,
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      return data as LogoutResponse;
    },
  });

  const refreshTokenMutation = useMutation({
    mutationFn: async (refreshToken: string) => {
      const { data } = await axios.post(
        `${AppConstants.apiUrl}/api/v1/consumer/auth/refresh`,
        {},
        {
          headers: {
            "User-Agent": Device.modelName,
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      return data as RefreshAccessTokenResponse;
    },
  });

  const getChapterMutation = useMutation({
    mutationFn: async (accessToken: string) => {
      const { data } = await axios.get(
        `${AppConstants.apiUrl}/api/v1/consumer/auth/me`,
        {
          headers: {
            "User-Agent": Device.modelName,
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return data as GetChapterResponse;
    },
  });

  /**
   * When the app first loads, fetch the refresh token, then use
   * it to refresh the access token, then use the access token to
   * fetch the chapter data, then authenticate the user with the
   * chapter data.
   */
  useEffect(() => {
    const fetchChapterData = async () => {
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      const response = await refreshTokenMutation.mutateAsync(refreshToken);

      if ("error" in response) {
        throw new Error("Could not refresh token");
      }

      const accessToken = response.data.accessToken;

      const chapterResponse = await getChapterMutation.mutateAsync(accessToken);

      if ("error" in chapterResponse) {
        throw new Error("Could not fetch chapter data");
      }

      const chapter = chapterResponse.data.chapter;

      await authenticateUser({ accessToken, refreshToken, chapter });
    };

    fetchChapterData()
      .catch(() => clearUserData())
      .finally(() => setIsLoading(false));
  }, []);

  /**
   * Fired on login and registration and when the app first loads. Takes
   * user data, verifies entitlements, and sets the user data in the context.
   */
  const authenticateUser = async (data: IUserData) => {
    const { accessToken, refreshToken, chapter } = data;

    if (!accessToken || !refreshToken || !chapter) {
      return;
    }

    Qonversion.getSharedInstance().identify(chapter.customerId);
    Qonversion.getSharedInstance().setUserProperty(
      UserPropertyKey.EMAIL,
      chapter.email,
    );

    await checkEntitlements();
    await AsyncStorage.setItem("refreshToken", refreshToken);

    setUserData({ accessToken, refreshToken, chapter });
  };

  /**
   * Log the user out anbd clear all user data
   */
  const logoutUser = async () => {
    const { refreshToken } = userData;

    if (!refreshToken) return;

    const response = await logoutMutation.mutateAsync(refreshToken);

    if ("error" in response) return;

    clearUserData();
  };

  /**
   * Wrapper around setUserData to make it easier to set the chapter
   */
  const setChapter = async (chapter: Chapter) => {
    setUserData({ ...userData, chapter });
  };

  /**
   * Clear all caches and local user data, along with logging out
   * of Qonversion.
   */
  const clearUserData = async () => {
    await globalStore.clear();
    await AsyncStorage.removeItem("refreshToken");

    setUserData({
      accessToken: null,
      refreshToken: null,
      chapter: {} as Chapter,
    });

    Qonversion.getSharedInstance().logout();
    await checkEntitlements();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        ...userData,

        mutations: {
          logoutMutation,
          refreshTokenMutation,
          getChapterMutation,
        },

        setChapter,
        clearUserData,
        logoutUser,
        authenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

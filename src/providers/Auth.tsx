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
import { useMutation } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Qonversion, { UserPropertyKey } from "react-native-qonversion";
import { createContext, useEffect, useState, useContext } from "react";

import AppConstants from "@/constants";
import { useGlobalStore } from "@/store";
import { useWebsocket } from "@/providers/Websocket";
import { useQonversion } from "@/providers/Qonversion";

interface IAuthContext {
  isLoading: boolean;
  chapter: Chapter;
  accessToken: string;
  refreshToken: string;

  clear(): void;
  setChapter(chapter: Chapter): void;
  login: (response: LoginResponse) => Promise<void>;
  register: (response: RegisterResponse) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const websocket = useWebsocket();
  const globalStore = useGlobalStore();
  const { checkEntitlements } = useQonversion();

  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [chapter, setChapter] = useState<Chapter>({} as Chapter);

  const refreshTokenMutation = useMutation({
    mutationFn: async (refreshToken: string) => {
      const { data } = await axios.post(
        `${AppConstants.apiUrl}/api/v1/consumer/auth/refresh`,
        {},
        {
          headers: {
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
        `${AppConstants.apiUrl}/api/v1/consumer/auth/chapter`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return data as GetChapterResponse;
    },
  });

  useEffect(() => {
    fetchChapterData();
  }, []);

  /**
   * Using a stored refresh token, get a new access token and
   * then access the chapter data
   */
  const fetchChapterData = async () => {
    try {
      // Get the refresh token from async storage
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      if (!refreshToken) {
        throw new Error("No refresh token found");
      }

      // Use the refresh token to get a new access token
      const response = await refreshTokenMutation.mutateAsync(refreshToken);

      if ("error" in response) {
        throw new Error("Could not refresh token");
      }

      const accessToken = response.data.accessToken;

      // Use the access token to get the chapter data
      const chapterResponse = await getChapterMutation.mutateAsync(accessToken);

      if ("error" in chapterResponse) {
        throw new Error("Could not fetch chapter data");
      }

      const chapter = chapterResponse.data.chapter;

      setChapter(chapter);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      Qonversion.getSharedInstance().identify(chapter.customerId);
      Qonversion.getSharedInstance().setUserProperty(
        UserPropertyKey.EMAIL,
        chapter.email,
      );

      await checkEntitlements();

      websocket.connect(accessToken);
    } catch {
      setAccessToken("");
      setRefreshToken("");
      setChapter({} as Chapter);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Take a response from the login mutation and set the store
   * to the new chapter and access token
   */
  const login = async (response: LoginResponse) => {
    if ("error" in response) return;

    const chapter = response.data.chapter;
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    await AsyncStorage.setItem("refreshToken", refreshToken);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setChapter(chapter);

    Qonversion.getSharedInstance().identify(chapter.customerId);
    Qonversion.getSharedInstance().setUserProperty(
      UserPropertyKey.EMAIL,
      chapter.email,
    );

    websocket.connect(accessToken);
  };

  /**
   * Take a response from the register mutation and set the store
   * to the new chapter and access token
   */
  const register = async (response: RegisterResponse) => {
    if ("error" in response) return;

    const chapter = response.data.chapter;
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;

    await AsyncStorage.setItem("refreshToken", refreshToken);

    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setChapter(chapter);

    Qonversion.getSharedInstance().identify(chapter.customerId);
    Qonversion.getSharedInstance().setUserProperty(
      UserPropertyKey.EMAIL,
      chapter.email,
    );

    websocket.connect(accessToken);
  };

  /**
   * Clear all of the users data from the store and the
   * async storage
   */
  const clear = async () => {
    await globalStore.clear();
    await AsyncStorage.removeItem("refreshToken");

    setAccessToken("");
    setRefreshToken("");
    setChapter({} as Chapter);

    Qonversion.getSharedInstance().logout();

    websocket.disconnect();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        chapter,
        accessToken,
        refreshToken,
        clear,
        setChapter,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

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
import { useQonversion } from "@/providers/Qonversion";

interface IUserData {
  chapter: Chapter;
  accessToken: string | null;
  refreshToken: string | null;
}

interface IAuthContext {
  /** Whether the initial auth data is still being fetched */
  isLoading: boolean;
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

  // const getChapterQuery = useQuery({
  //   queryKey: ["chapter", userData.accessToken],
  //   enabled: !!userData.accessToken,
  //   queryFn: async () => {
  //     const url = `${AppConstants.apiUrl}/api/v1/consumer/auth/chapter`;

  //     const { data } = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${userData.accessToken}`,
  //       },
  //     });

  //     return data as GetChapterResponse;
  //   },
  // });

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

        setChapter,
        clearUserData,
        authenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

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

import { useMutation } from "@tanstack/react-query";
import Purchases, { CustomerInfo } from "react-native-purchases";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState, useContext } from "react";

import authAPI from "@/apiv1/auth";
import useZustandStore from "@/state";
import { useWebsocket } from "@/providers/Websocket";

interface AuthContextProps {
  isPro: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  chapter: Chapter;
  customerData: CustomerInfo;

  signOut: () => void;
  clearUserData: () => void;
  updateChapter: (chapter: Chapter) => void;
  signIn: (response: LoginResponse) => Promise<void>;
  signUp: (response: RegisterAsChapterAPIResponse) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // Whether or not the app is loading
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // The current chapters access token
  const [accessToken, setAccessToken] = useState<string>("");
  // The current chapters refresh token
  const [refreshToken, setRefreshToken] = useState<string>("");
  // The current chapter's data
  const [chapter, setChapter] = useState<Chapter>({} as Chapter);
  // The current chapter's billing data
  const [customerData, setcustomerData] = useState<CustomerInfo>(
    {} as CustomerInfo,
  );

  // Clears all the pnms when user logs out
  const { resetState } = useZustandStore();

  // Import the websocket data
  const websocket = useWebsocket();

  // Declare all AuthAPI mutations
  const refreshAccessTokenMutation = useMutation({
    mutationFn: (refreshToken: string) => {
      return authAPI.refreshAccessToken({
        refreshToken,
      });
    },
  });

  const getChapterMutation = useMutation({
    mutationFn: (accessToken: string) => {
      return authAPI.getChapter({
        accessToken,
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => {
      return authAPI.logout({ accessToken });
    },
  });

  // On initial load (ONLY ONCE)
  // Load the refresh token,
  // if refresh token, will load access token,
  // if access token, will load chapter,
  // if chapter, will load billing data
  useEffect(() => {
    _loadRefreshToken();
  }, []);

  Purchases.addCustomerInfoUpdateListener((customerInfo) => {
    setcustomerData(customerInfo);
  });

  // Load the refresh token from storage (if it exists)
  const _loadRefreshToken = async () => {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    // If the refresh token exists, set it
    if (refreshToken) {
      setRefreshToken(refreshToken);
      // Refresh the access token using the refresh token
      _loadAccessToken(refreshToken);
    } else {
      // If the refresh token doesn't exist, set the loading state to false
      setRefreshToken("");
      setIsLoading(false);
    }
  };

  // Refresh the access token with the refresh token
  const _loadAccessToken = async (refreshToken: string) => {
    try {
      // Request a new access token using the refresh token
      const response =
        await refreshAccessTokenMutation.mutateAsync(refreshToken);
      // The access token
      const accessToken = response.data?.data.accessToken;
      // store the access token in state
      setAccessToken(accessToken);
      // Load the chapter from the access token
      _loadChapter(accessToken);
    } catch (error) {
      // If the request or access token is invalid, set the loading state to false
      setAccessToken("");
      setIsLoading(false);
    }
  };

  // Load the currently logged in chapter
  const _loadChapter = async (accessToken: string) => {
    try {
      // Get the currently logged in chapter
      const response = await getChapterMutation.mutateAsync(accessToken);
      // The chapter data
      const chapter = response.data?.data.chapter;
      // Set the chapter in state
      setChapter(chapter);
      // Load the chapter's billing data from revenue cat
      _loadCustomerData(chapter);
      // Connect to the websocket
      websocket.connect(accessToken);
    } catch (error) {
      // If the request or access token is invalid, set the loading state to false
      setChapter({} as Chapter);
      setIsLoading(false);
    }
  };

  // Load the currently logged in chapter's billing data
  const _loadCustomerData = async (chapter: Chapter) => {
    try {
      // Login the user with revenue cat
      await Purchases.logIn(chapter.customerId);

      // Set the customer Id in local storage
      await AsyncStorage.setItem("customerId", chapter.customerId);

      // Get the chapter's billing data
      const customerData = await Purchases.getCustomerInfo();

      // Set the billing data in state
      setcustomerData(customerData);
    } catch (error) {
      setcustomerData({} as CustomerInfo);
    }

    // Finally, set the loading state to false
    setIsLoading(false);
  };

  // Sign in as an chapter
  const signIn = async (response: LoginResponse) => {
    if ("error" in response) return;

    // The new chapter data
    const chapter = response.data.chapter;
    // The new access token
    const accessToken = response.data.accessToken;
    // The new refresh token
    const refreshToken = response.data.refreshToken;

    // Store the refresh token in storage
    await AsyncStorage.setItem("refreshToken", refreshToken);

    // Update the state for all of the new data
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setChapter(chapter);

    // Load the new chapter's billing data
    _loadCustomerData(chapter);
    // Connect to the websocket
    websocket.connect(accessToken);
  };

  // Sign up as an chapter
  const signUp = async (response: RegisterAsChapterAPIResponse) => {
    // The new chapter data
    const chapter = response.data?.data.chapter;
    // The new access token
    const accessToken = response.data?.data.accessToken;
    // The new refresh token
    const refreshToken = response.data?.data.refreshToken;

    // Store the refresh token in storage
    await AsyncStorage.setItem("refreshToken", refreshToken);

    // Update the state for all of the new data
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setChapter(chapter);

    // Load the new chapter's billing data
    _loadCustomerData(chapter);
    // Connect to the websocket
    websocket.connect(accessToken);
  };

  // Update the chapter
  const updateChapter = (chapter: Chapter) => {
    setChapter(chapter);
  };

  // Sign out the chapter
  const signOut = async () => {
    if (!accessToken) return;

    logoutMutation.mutate(undefined, {
      onSuccess: async () => {
        await clearUserData();
      },
    });
  };

  // Clear all user data
  const clearUserData = async () => {
    // Clear all of the user data from the store
    await resetState();

    // Clear the refresh token from storage
    await AsyncStorage.removeItem("refreshToken");

    // Clear all of the user data from state
    setChapter({} as Chapter);
    setAccessToken("");
    setRefreshToken("");

    // Disconnect from the websocket
    websocket.disconnect();
  };

  const isPro =
    Object.keys(customerData?.entitlements?.active || {}).includes("pro") ||
    false;

  return (
    <AuthContext.Provider
      value={{
        isPro,
        isLoading,
        accessToken,
        refreshToken,
        chapter,
        customerData,

        signOut,
        signIn,
        signUp,

        clearUserData,
        updateChapter,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

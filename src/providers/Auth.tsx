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

import authAPI from "@/api/auth";
import useZustandStore from "@/state";
import { useWebsocket } from "@/providers/Websocket";

interface AuthContextProps {
  isPro: boolean;
  isLoading: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  organization: Organization;
  customerData: CustomerInfo;

  signOut: () => void;
  clearUserData: () => void;
  updateOrganization: (organization: Organization) => void;
  signIn: (response: LoginAsOrganizationAPIResponse) => Promise<void>;
  signUp: (response: RegisterAsOrganizationAPIResponse) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // Whether or not the app is loading
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // The current organizations access token
  const [accessToken, setAccessToken] = useState<string>("");
  // The current organizations refresh token
  const [refreshToken, setRefreshToken] = useState<string>("");
  // The current organization's data
  const [organization, setOrganization] = useState<Organization>(
    {} as Organization,
  );
  // The current organization's billing data
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

  const getOrganizationMutation = useMutation({
    mutationFn: (accessToken: string) => {
      return authAPI.getOrganization({
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
  // if access token, will load organization,
  // if organization, will load billing data
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
      // Load the organization from the access token
      _loadOrganization(accessToken);
    } catch (error) {
      // If the request or access token is invalid, set the loading state to false
      setAccessToken("");
      setIsLoading(false);
    }
  };

  // Load the currently logged in organization
  const _loadOrganization = async (accessToken: string) => {
    try {
      // Get the currently logged in organization
      const response = await getOrganizationMutation.mutateAsync(accessToken);
      // The organization data
      const organization = response.data?.data.organization;
      // Set the organization in state
      setOrganization(organization);
      // Load the organization's billing data from revenue cat
      _loadCustomerData(organization);
      // Connect to the websocket
      websocket.connect(accessToken);
    } catch (error) {
      // If the request or access token is invalid, set the loading state to false
      setOrganization({} as Organization);
      setIsLoading(false);
    }
  };

  // Load the currently logged in organization's billing data
  const _loadCustomerData = async (organization: Organization) => {
    try {
      // Login the user with revenue cat
      await Purchases.logIn(organization.customerId);

      // Set the customer Id in local storage
      await AsyncStorage.setItem("customerId", organization.customerId);

      // Get the organization's billing data
      const customerData = await Purchases.getCustomerInfo();

      // Set the billing data in state
      setcustomerData(customerData);
    } catch (error) {
      setcustomerData({} as CustomerInfo);
    }

    // Finally, set the loading state to false
    setIsLoading(false);
  };

  // Sign in as an organization
  const signIn = async (response: LoginAsOrganizationAPIResponse) => {
    // The new organization data
    const organization = response.data?.data.organization;
    // The new access token
    const accessToken = response.data?.data.accessToken;
    // The new refresh token
    const refreshToken = response.data?.data.refreshToken;

    // Store the refresh token in storage
    await AsyncStorage.setItem("refreshToken", refreshToken);

    // Update the state for all of the new data
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setOrganization(organization);

    // Load the new organization's billing data
    _loadCustomerData(organization);
    // Connect to the websocket
    websocket.connect(accessToken);
  };

  // Sign up as an organization
  const signUp = async (response: RegisterAsOrganizationAPIResponse) => {
    // The new organization data
    const organization = response.data?.data.organization;
    // The new access token
    const accessToken = response.data?.data.accessToken;
    // The new refresh token
    const refreshToken = response.data?.data.refreshToken;

    // Store the refresh token in storage
    await AsyncStorage.setItem("refreshToken", refreshToken);

    // Update the state for all of the new data
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setOrganization(organization);

    // Load the new organization's billing data
    _loadCustomerData(organization);
    // Connect to the websocket
    websocket.connect(accessToken);
  };

  // Update the organization
  const updateOrganization = (organization: Organization) => {
    setOrganization(organization);
  };

  // Sign out the organization
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
    setOrganization({} as Organization);
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
        organization,
        customerData,

        signOut,
        signIn,
        signUp,

        clearUserData,
        updateOrganization,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;

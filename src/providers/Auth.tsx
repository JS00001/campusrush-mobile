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

import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import Purchases, { CustomerInfo } from "react-native-purchases";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState, useContext } from "react";

import authAPI from "@/api/auth";

interface AuthContextProps {
  isLoading: boolean;

  accessToken: string | null;
  refreshToken: string | null;
  organization: Organization;

  billingData: CustomerInfo;

  clearUserData: () => void;

  signOut: () => void;
  signIn: (input: LoginAsOrganizationInput) => Promise<void | APIError>;
  signUp: (input: RegisterAsOrganizationInput) => Promise<void | APIError>;

  refetchBillingData: () => Promise<void>;

  verifyOrganization: (input: VerifyOrganizationInput) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;

  updateOrganization: (organization: Organization) => void;
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
  const [billingData, setBillingData] = useState<CustomerInfo>(
    {} as CustomerInfo,
  );

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

  const loginAsOrganizationMutation = useMutation({
    mutationFn: (input: LoginAsOrganizationInput) => {
      return authAPI.loginAsOrganization(input);
    },
  });

  const registerAsOrganizationMutation = useMutation({
    mutationFn: (input: RegisterAsOrganizationInput) => {
      return authAPI.registerAsOrganization(input);
    },
  });

  const resendVerificationEmailMutation = useMutation({
    mutationFn: () => {
      return authAPI.resendVerification({ accessToken });
    },
  });

  const verifyOrganizationMutation = useMutation({
    mutationFn: (input: VerifyOrganizationInput) => {
      return authAPI.verifyOrganization({ ...input, accessToken });
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
      const response = await refreshAccessTokenMutation.mutateAsync(
        refreshToken,
      );
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
      _loadBillingData(organization);
    } catch (error) {
      // If the request or access token is invalid, set the loading state to false
      setOrganization({} as Organization);
      setIsLoading(false);
    }
  };

  // Load the currently logged in organization's billing data
  const _loadBillingData = async (organization: Organization) => {
    try {
      // Login the user with revenue cat
      await Purchases.logIn(organization.customerId);

      // Set the customer Id in local storage
      await AsyncStorage.setItem("customerId", organization.customerId);

      // Get the organization's billing data
      const billingData = await Purchases.getCustomerInfo();
      // Set the billing data in state
      setBillingData(billingData);
    } catch (error) {
      setBillingData({} as CustomerInfo);
    }

    // Finally, set the loading state to false
    setIsLoading(false);
  };

  /**
   * Public APIs
   */
  // Refetch billing data
  const refetchBillingData = async () => {
    try {
      // Login the user with revenue cat
      await Purchases.logIn(organization.customerId);

      // Set the customer Id in local storage
      await AsyncStorage.setItem("customerId", organization.customerId);

      // Get the organization's billing data
      const billingData = await Purchases.getCustomerInfo();

      // Set the billing data in state
      setBillingData(billingData);
    } catch (error) {
      setBillingData({} as CustomerInfo);
    }
  };

  // Sign in as an organization
  const signIn = async (input: LoginAsOrganizationInput) => {
    try {
      // The login response/request
      const response = await loginAsOrganizationMutation.mutateAsync(input);
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
      _loadBillingData(organization);
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data?.error as APIError;
      }
    }
  };

  // Sign up as an organization
  const signUp = async (input: RegisterAsOrganizationInput) => {
    try {
      // The register response/request
      const response = await registerAsOrganizationMutation.mutateAsync(input);
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
      _loadBillingData(organization);
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data?.error as APIError;
      }
    }
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
    // Clear the refresh token from storage
    await AsyncStorage.removeItem("refreshToken");

    // Clear all of the user data from state
    setOrganization({} as Organization);
    setAccessToken("");
    setRefreshToken("");
  };

  // Verify the organization
  const verifyOrganization = async (input: VerifyOrganizationInput) => {
    try {
      await verifyOrganizationMutation.mutateAsync(input);

      setOrganization({
        ...organization,
        verified: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Resend the verification email
  const resendVerificationEmail = async () => {
    try {
      await resendVerificationEmailMutation.mutateAsync();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        accessToken,
        refreshToken,
        organization,
        billingData,

        refetchBillingData,

        signOut,
        signIn,
        signUp,

        verifyOrganization,
        resendVerificationEmail,

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

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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState, useContext } from "react";

import authAPI from "@/api/auth";

interface AuthContextProps {
  isLoading: boolean;

  accessToken: string | null;
  refreshToken: string | null;
  organization: Organization;

  clearUserData: () => void;

  signOut: () => void;
  signIn: (input: LoginAsOrganizationInput) => Promise<void>;
  signUp: (input: RegisterAsOrganizationInput) => Promise<void>;

  verifyOrganization: (input: VerifyOrganizationInput) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;

  updateOrganization: (organization: Organization) => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // Declare state variables
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");
  const [organization, setOrganization] = useState<Organization>(
    {} as Organization,
  );

  // Declare temporary local variables
  let _accessToken: string | null = null;
  let _refreshToken: string | null = null;

  // Declare all AuthAPI mutations
  const refreshAccessTokenMutation = useMutation({
    mutationFn: () => {
      return authAPI.refreshAccessToken({ refreshToken });
    },
  });

  const getOrganizationMutation = useMutation({
    mutationFn: () => {
      return authAPI.getOrganization({ accessToken });
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

  // On initial load, load the refresh token and access token from storage
  useEffect(() => {
    _loadInitialData();
  }, []);

  // Load initial data on app load
  const _loadInitialData = async () => {
    await _loadRefreshToken();
    await _loadAccessToken();
    await _loadOrganization();
    setIsLoading(false);
  };

  // Load the refresh token from storage (if it exists)
  const _loadRefreshToken = async () => {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (refreshToken) {
      _refreshToken = refreshToken;
      setRefreshToken(refreshToken);
    }
  };

  // Refresh the access token with the refresh token
  const _loadAccessToken = async () => {
    if (!_refreshToken) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await refreshAccessTokenMutation.mutateAsync();
      const accessToken = response.data?.data.accessToken;

      _accessToken = accessToken;
      setAccessToken(accessToken);
    } catch (error) {
      setAccessToken("");
    }
  };

  // Load the currently logged in organization
  const _loadOrganization = async () => {
    if (!_accessToken) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await getOrganizationMutation.mutateAsync();
      const organization = response.data?.data.organization;
      setOrganization(organization);
    } catch (error) {
      setOrganization({} as Organization);
    }
  };

  /**
   * Public APIs
   */

  // Sign in as an organization
  const signIn = async (input: LoginAsOrganizationInput) => {
    try {
      const response = await loginAsOrganizationMutation.mutateAsync(input);
      const organization = response.data?.data.organization;
      const accessToken = response.data?.data.accessToken;
      const refreshToken = response.data?.data.refreshToken;

      await AsyncStorage.setItem("refreshToken", refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setOrganization(organization);
    } catch (error) {
      console.log(error);
    }
  };

  // Sign up as an organization
  const signUp = async (input: RegisterAsOrganizationInput) => {
    try {
      const response = await registerAsOrganizationMutation.mutateAsync(input);
      const organization = response.data?.data.organization;
      const accessToken = response.data?.data.accessToken;
      const refreshToken = response.data?.data.refreshToken;

      await AsyncStorage.setItem("refreshToken", refreshToken);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setOrganization(organization);
    } catch (error) {
      console.log(error);
    }
  };

  // Update the organization
  const updateOrganization = (organization: Organization) => {
    setOrganization(organization);
  };

  // Sign out the organization
  const signOut = async () => {
    if (!accessToken) {
      return;
    }

    logoutMutation.mutate(undefined, {
      onSuccess: async () => {
        await AsyncStorage.removeItem("refreshToken");
        setOrganization({} as Organization);
        setAccessToken("");
        setRefreshToken("");
      },
    });
  };

  // Clear all user data
  const clearUserData = async () => {
    await AsyncStorage.removeItem("refreshToken");
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

/*
 * Created on Fri Feb 23 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useMutation } from '@tanstack/react-query';

import type {
  ChangePasswordRequest,
  CheckEmailRequest,
  LoginRequest,
  LogoutResponse,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyChapterRequest,
} from '@/types';

import {
  login,
  register,
  checkEmail,
  verifyChapter,
  resendVerification,
  resetPassword,
  changePassword,
} from '@/api';
import axios from '@/lib/axios';
import usePosthog from '@/hooks/usePosthog';
import queryClient from '@/lib/query-client';
import { useQonversion } from '@/providers/external/Qonversion';
import { getRefreshToken, setAccessToken, setRefreshToken } from '@/lib/auth';

/**
 * Log the user into their account, then:
 * - Log them into the payment provider to validate their entitlements
 * - Identify them in Posthog for analytics
 * - Set the access token, refreshToken, and chapter
 */
export const useLogin = () => {
  const posthog = usePosthog();
  const qonversion = useQonversion();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await login(data);
      if ('error' in response) throw response;
      const chapter = response.data.chapter;
      // Login to 3rd party services
      await qonversion.login(chapter);
      posthog.identify(chapter._id, { role: chapter.role });
      return response;
    },
    onSuccess: async (res) => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);

      queryClient.setQueryData(['chapter'], { chapter: res.data.chapter });
      posthog.capture('LOGIN');
    },
  });
};

/**
 * Register the user into their account, then:
 * - Log them into the payment provider to validate their entitlements
 * - Identify them in Posthog for analytics
 * - Set the access token, refreshToken, and chapter
 */
export const useRegister = () => {
  const posthog = usePosthog();
  const qonversion = useQonversion();

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await register(data);
      if ('error' in response) throw response;
      const chapter = response.data.chapter;
      await qonversion.login(chapter);
      posthog.identify(chapter._id, { role: chapter.role });
      return response;
    },
    onSuccess: async (res) => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);

      queryClient.setQueryData(['chapter'], { chapter: res.data.chapter });
      posthog.capture('REGISTER');
    },
  });
};

/**
 * Check if an email already exists (has an account)
 */
export const useCheckEmail = () => {
  return useMutation({
    mutationFn: async (data: CheckEmailRequest) => {
      const response = await checkEmail(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

/**
 * Verify the user's email address, then:
 * - Set the updated chapter in the queryClient so that the UI updates
 */
export const useVerifyEmail = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: VerifyChapterRequest) => {
      const response = await verifyChapter(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (res) => {
      queryClient.setQueryData(['chapter'], { chapter: res.data.chapter });
      posthog.capture('EMAIL_VERIFIED');
    },
  });
};

/**
 * Resend the verification email
 */
export const useResendVerification = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async () => {
      const response = await resendVerification();
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async () => {
      posthog.capture('RESEND_VERIFICATION');
    },
  });
};

/**
 * Send a reset password email with a code to the user
 */
export const useResetPassword = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: ResetPasswordRequest) => {
      const response = await resetPassword(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async () => {
      posthog.capture('RESET_PASSWORD');
    },
  });
};

/**
 * Change the user's password, then:
 * - Log them into the payment provider to validate their entitlements
 * - Identify them in Posthog for analytics
 * - Set the access token, refreshToken, and chapter
 */
export const useChangePassword = () => {
  const posthog = usePosthog();
  const qonversion = useQonversion();

  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) => {
      const response = await changePassword(data);
      if ('error' in response) throw response;
      const chapter = response.data.chapter;
      await qonversion.login(chapter);
      posthog.identify(chapter._id, { role: chapter.role });
      return response;
    },
    onSuccess: async (res) => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);

      queryClient.setQueryData(['chapter'], { chapter: res.data });
      posthog.capture('CHANGE_PASSWORD');
    },
  });
};

/**
 * Log the user out of their account, then:
 * - Log them out of the payment provider
 * - Log them out of Posthog
 * - Reset all cached queries so that future logins don't have stale data
 */
export const useLogout = () => {
  const posthog = usePosthog();
  const qonversion = useQonversion();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = await getRefreshToken();
      const res = await axios.post(`/auth/logout`, undefined, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      const response = res.data as LogoutResponse;
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async () => {
      setAccessToken(null);
      setRefreshToken(null);

      posthog.capture('LOGOUT');
      posthog.reset();
      queryClient.resetQueries();
      await qonversion.logout();
    },
  });
};

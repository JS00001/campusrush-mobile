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

export const useLogin = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await login(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (res) => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);

      await queryClient.refetchQueries({ queryKey: ['chapter'] });
      posthog.capture('LOGIN');
    },
  });
};

export const useRegister = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await register(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (res) => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);

      await queryClient.refetchQueries({ queryKey: ['chapter'] });
      posthog.capture('REGISTER');
    },
  });
};

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: async (data: CheckEmailRequest) => {
      const response = await checkEmail(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useVerifyEmail = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: VerifyChapterRequest) => {
      const response = await verifyChapter(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['chapter'] });
      posthog.capture('EMAIL_VERIFIED');
    },
  });
};

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

export const useChangePassword = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) => {
      const response = await changePassword(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (res) => {
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);

      await queryClient.refetchQueries({ queryKey: ['chapter'] });
      posthog.capture('CHANGE_PASSWORD');
    },
  });
};

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
      await qonversion.logout();
      await queryClient.refetchQueries({ queryKey: ['chapter'] });
      posthog.reset();
      queryClient.resetQueries();
    },
  });
};

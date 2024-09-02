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
  refresh,
  resetPassword,
  changePassword,
} from '@/api';
import { useAuth } from '@/providers/Auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const response = await login(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await register(data);
      if ('error' in response) throw response;
      return response;
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
  return useMutation({
    mutationFn: async (data: VerifyChapterRequest) => {
      const response = await verifyChapter(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await resendVerification();
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useRefresh = () => {
  const { refreshToken } = useAuth();

  return useMutation({
    mutationFn: async () => {
      const response = await refresh({ refreshToken: refreshToken as string });
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data: ResetPasswordRequest) => {
      const response = await resetPassword(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordRequest) => {
      const response = await changePassword(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

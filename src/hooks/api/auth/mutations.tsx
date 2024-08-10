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

import { useMutation } from "@tanstack/react-query";

import {
  login,
  register,
  checkEmail,
  verifyChapter,
  resendVerification,
  refresh,
} from "@/api";

import { useAuth } from "@/providers/Auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) => {
      return login(data);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => {
      return register(data);
    },
  });
};

export const useCheckEmail = () => {
  return useMutation({
    mutationFn: (data: CheckEmailRequest) => {
      return checkEmail(data);
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (data: VerifyChapterRequest) => {
      return verifyChapter(data);
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: () => {
      return resendVerification();
    },
  });
};

export const useRefresh = () => {
  const { refreshToken } = useAuth();

  return useMutation({
    mutationFn: () => {
      return refresh({ refreshToken: refreshToken as string });
    },
  });
};

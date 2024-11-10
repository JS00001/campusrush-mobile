/*
 * Created on Sat Nov 09 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import React from "react";

import { useRefreshAccessToken } from "@/hooks/api/auth";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoading } = useRefreshAccessToken();

  if (isLoading) return null;

  return children;
};

export default AuthProvider;

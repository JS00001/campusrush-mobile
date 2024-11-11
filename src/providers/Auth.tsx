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

import React, { useRef } from "react";

import { useRefreshAccessToken } from "@/hooks/api/auth";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialized = useRef(false);
  const { isPending } = useRefreshAccessToken();

  /**
   * On the first app load, we want to fetch this query if needed (if the user is loggedin)
   * then, we dont want to fetch it again (we only refresh the token once per app load)
   * so we keep track of it already being initialized
   */
  if (isPending && !initialized.current) {
    initialized.current = true;
    return null;
  }

  return children;
};

export default AuthProvider;

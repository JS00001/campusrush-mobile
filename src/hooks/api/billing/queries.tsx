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

import { useQuery } from "@tanstack/react-query";

import { getEntitlements } from "@/api";
import { useAuth } from "@/providers/Auth";

export const useGetEntitlements = () => {
  const { accessToken } = useAuth();

  return useQuery(["entitlements", accessToken], {
    queryFn: async () => {
      return getEntitlements();
    },
  });
};

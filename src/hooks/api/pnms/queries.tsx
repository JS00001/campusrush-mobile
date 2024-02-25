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

import { getPnms, getPnm } from "@/api";
import { useAuth } from "@/providers/Auth";

export const useGetPnms = () => {
  const { accessToken } = useAuth();

  return useQuery(["pnms", accessToken], {
    queryFn: () => {
      return getPnms();
    },
  });
};

export const useGetPnm = (id: string) => {
  const { accessToken } = useAuth();

  return useQuery(["pnm", id, accessToken], {
    queryFn: () => {
      return getPnm({ id });
    },
  });
};

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

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { usePnmStore } from "@/store";
import { getPnms, getPnm } from "@/api";
import { useAuth } from "@/providers/Authv1";

export const useGetPnms = () => {
  const { accessToken } = useAuth();

  const pnms = usePnmStore((s) => s.pnms);
  const setPnms = usePnmStore((s) => s.setPnms);

  const query = useQuery(["pnms", accessToken], {
    queryFn: () => {
      return getPnms();
    },
  });

  useEffect(() => {
    if (!query.data || "error" in query.data) return;

    setPnms(query.data.data.pnms);
  }, [query.data]);

  return {
    ...query,
    pnms,
  };
};

export const useGetPnm = (id: string) => {
  const { accessToken } = useAuth();

  const pnm = usePnmStore((s) => s.getPnm(id));
  const addOrUpdatePnm = usePnmStore((s) => s.addOrUpdatePnm);

  const query = useQuery(["pnm", id, accessToken], {
    queryFn: () => {
      return getPnm({ id });
    },
  });

  useEffect(() => {
    if (!query.data || "error" in query.data) return;

    addOrUpdatePnm(query.data.data.pnm);
  }, [query.data]);

  return {
    ...query,
    pnm,
  };
};

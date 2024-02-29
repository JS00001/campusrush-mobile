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

import { useAuth } from "@/providers/Auth";
import { getChapterStatistics } from "@/api";
import { useStatisticsStore } from "@/store";
import { useEffect } from "react";

export const useGetChapterStatistics = () => {
  const { accessToken } = useAuth();

  const statisticsStore = useStatisticsStore();

  const query = useQuery(["chapterStatistics", accessToken], {
    queryFn: async () => {
      return getChapterStatistics();
    },
  });

  useEffect(() => {
    if (!query.data || "error" in query.data) return;

    statisticsStore.setField("pnmCount", query.data.data.pnms);
    statisticsStore.setField("starredPnmCount", query.data.data.starredPnms);
    statisticsStore.setField("recentPnms", query.data.data.recentPnms);
  }, [query.data]);

  return {
    ...query,
    pnmCount: statisticsStore.pnmCount,
    starredPnmCount: statisticsStore.starredPnmCount,
    recentPnms: statisticsStore.recentPnms,
  };
};

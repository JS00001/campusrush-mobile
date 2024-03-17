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

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/providers/Auth";
import { getChapterStatistics } from "@/api";
import { useStatisticsStore } from "@/store";

export const useGetChapterStatistics = () => {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const statisticsStore = useStatisticsStore();

  const query = useQuery(["chapterStatistics", accessToken], {
    queryFn: async () => {
      return getChapterStatistics();
    },
  });

  useEffect(() => {
    if (!query.data || "error" in query.data) {
      setIsLoading(query.isLoading);
      return;
    }

    statisticsStore.setField("pnmCount", query.data.data.pnms);
    statisticsStore.setField("recentPnms", query.data.data.recentPnms);
    statisticsStore.setField("starredPnmCount", query.data.data.starredPnms);

    setIsLoading(query.isLoading);
  }, [query.data]);

  return {
    ...query,
    pnmCount: statisticsStore.pnmCount,
    starredPnmCount: statisticsStore.starredPnmCount,
    recentPnms: statisticsStore.recentPnms,
    isLoading: isLoading && !statisticsStore.pnmCount,
  };
};

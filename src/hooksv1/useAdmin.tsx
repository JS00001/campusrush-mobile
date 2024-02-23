/*
 * Created on Sun Sep 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useMutation, useQuery } from "@tanstack/react-query";

import adminApi from "@/apiv1/api/admin";
import { useAuth } from "@/providers/Auth";

const useAdmin = () => {
  const { chapter, updateChapter, accessToken } = useAuth();

  const getStatisticsQuery = useQuery({
    queryKey: ["getAdminStatistics", accessToken],
    queryFn: () => {
      return adminApi.getStatistics();
    },
  });

  const getChaptersQuery = useQuery({
    queryKey: ["getAdminChapters", accessToken],
    queryFn: () => {
      return adminApi.getChapters();
    },
  });

  const upgradeChapterMutation = useMutation({
    mutationFn: (input: UpgradeChapterInput) => {
      return adminApi.upgradeChapter(input);
    },
  });

  const downgradeChapterMutation = useMutation({
    mutationFn: (input: DowngradeChapterInput) => {
      return adminApi.downgradeChapter(input);
    },
  });

  /**
   * Give an chapter a basic subscription (lifetime)
   * If no id is provided, the current chapter is used (admin only)
   */
  const forceBasicSubscription = async (id?: string) => {
    const response = await upgradeChapterMutation.mutateAsync({
      id: id || chapter?._id,
      entitlements: ["basic"],
    });

    const updatedChapter = response.data?.data.chapter;

    if (updatedChapter) {
      updateChapter(updatedChapter);
    }
  };

  /**
   * Give an chapter a pro subscription (monthly)
   * If no id is provided, the current chapter is used (admin only)
   */
  const forceProSubscription = async (id?: string) => {
    const response = await upgradeChapterMutation.mutateAsync({
      id: id || chapter?._id,
      entitlements: ["pro"],
    });

    const updatedChapter = response.data?.data.chapter;

    if (updatedChapter) {
      updateChapter(updatedChapter);
    }
  };

  /**
   * Give an chapter a pro subscription (monthly)
   * If no id is provided, the current chapter is used (admin only)
   */
  const clearSubscription = async (id?: string) => {
    const response = await downgradeChapterMutation.mutateAsync({
      id: id || chapter?._id,
    });

    const updatedChapter = response.data?.data.chapter;

    if (updatedChapter) {
      updateChapter(updatedChapter);
    }
  };

  // Structure data to be more usable
  const chapters = getChaptersQuery.data?.data?.data.chapters || [];

  // Structure data to be more usable
  const statistics = {
    numChapters: getStatisticsQuery.data?.data?.data.numChapters || 0,
    numPayingChapters:
      getStatisticsQuery.data?.data?.data.numPayingChapters || 0,
  };

  return {
    refetchChapters: getChaptersQuery.refetch,
    chapters,
    statistics,
    getStatisticsQuery,
    getChaptersQuery,
    upgradeChapterMutation,
    downgradeChapterMutation,
    forceBasicSubscription,
    forceProSubscription,
    clearSubscription,
  };
};

export default useAdmin;

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

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { getEvent, getEvents } from "@/api";
import { useAuth } from "@/providers/Auth";

export const useGetEvents = () => {
  const { accessToken } = useAuth();

  return useInfiniteQuery(["events", accessToken], {
    queryFn: ({ pageParam = 0 }) => {
      return getEvents({ offset: pageParam });
    },
    getNextPageParam: (lastPage) => {
      if ("error" in lastPage) return undefined;

      const hasNextPage = lastPage.data.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.data.nextOffset;
    },
  });
};

export const useGetEvent = (id: string) => {
  return useQuery(["event", id], () => {
    return getEvent({ id });
  });
};

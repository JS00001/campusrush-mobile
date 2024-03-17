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
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { useEventStore } from "@/store";
import { useAuth } from "@/providers/Auth";
import { getEvent, getEvents } from "@/api";

export const useGetEvents = () => {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const events = useEventStore((s) => s.events);
  const setEvents = useEventStore((s) => s.setEvents);

  const query = useInfiniteQuery(["events", accessToken], {
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

  useEffect(() => {
    if (!query.data) {
      setIsLoading(query.isLoading);
      return;
    }

    const combinedEvents = query.data.pages.flatMap((page) => {
      if ("error" in page) return [];

      return page.data.events;
    });

    setEvents(combinedEvents);
    setIsLoading(query.isLoading);
  }, [query.data]);

  return {
    ...query,
    events,
    isLoading: isLoading && !events.length,
  };
};

export const useGetEvent = (id: string) => {
  const { accessToken } = useAuth();

  const event = useEventStore((s) => s.getEvent(id));
  const addOrUpdateEvent = useEventStore((s) => s.addOrUpdateEvent);

  const query = useQuery(["event", id, accessToken], () => {
    return getEvent({ id });
  });

  useEffect(() => {
    if (!query.data || "error" in query.data) return;

    addOrUpdateEvent(query.data.data.event);
  }, [query.data]);

  return {
    ...query,
    event,
  };
};

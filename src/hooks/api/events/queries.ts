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

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useEventStore } from '@/store';
import { useAuth } from '@/providers/Auth';
import { getEvent, getEvents } from '@/api';

export const useGetEvents = () => {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const events = useEventStore((s) => s.events);
  const setEvents = useEventStore((s) => s.setEvents);

  const query = useQuery(['events', accessToken], {
    queryFn: () => {
      return getEvents();
    },
  });

  useEffect(() => {
    if (!query.data || 'error' in query.data) {
      setIsLoading(query.isLoading);
      return;
    }

    setEvents(query.data.data.events);
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
  const [responses, setResponses] = useState<EventResponse[]>([]);
  const addOrUpdateEvent = useEventStore((s) => s.addOrUpdateEvent);

  const query = useQuery(['event', id, accessToken], () => {
    return getEvent({ id });
  });

  useEffect(() => {
    if (!query.data || 'error' in query.data) return;

    addOrUpdateEvent(query.data.data.event);
    setResponses(query.data.data.responses);
  }, [query.data]);

  return {
    ...query,
    event,
    responses,
  };
};

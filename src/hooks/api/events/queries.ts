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

import type { IEventResponse } from '@/types';

import { useEventStore } from '@/store';
import { useAuth } from '@/providers/Auth';
import { getEvent, getEvents } from '@/api';

/**
 * Get all of the events the chapter has
 */
export const useGetEvents = () => {
  const { accessToken } = useAuth();
  const events = useEventStore((s) => s.events);
  const setEvents = useEventStore((s) => s.setEvents);

  const query = useQuery(['events', accessToken], {
    queryFn: async () => {
      const response = await getEvents();
      if ('error' in response) throw response;
      return response;
    },
  });

  useEffect(() => {
    if (!query.data || query.isError) {
      return;
    }

    setEvents(query.data.data.events);
  }, [query.data]);

  return {
    ...query,
    events,
    isLoading: query.isLoading && !events.length,
  };
};

/**
 * Get a specific event by its ID
 */
export const useGetEvent = (id: string) => {
  const { accessToken } = useAuth();
  const event = useEventStore((s) => s.getEvent(id));
  const [responses, setResponses] = useState<IEventResponse[]>([]);
  const addOrUpdateEvent = useEventStore((s) => s.addOrUpdateEvent);

  const query = useQuery(['event', id, accessToken], {
    queryFn: async () => {
      const response = await getEvent({ id });
      if ('error' in response) throw response;
      return response;
    },
  });

  useEffect(() => {
    if (!query.data || query.isError) return;

    addOrUpdateEvent(query.data.data.event);
    setResponses(query.data.data.responses);
  }, [query.data]);

  return {
    ...query,
    event,
    responses,
  };
};

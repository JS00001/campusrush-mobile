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

import { useMutation } from '@tanstack/react-query';

import type {
  CreateEventRequest,
  UpdateEventRequest,
  DeleteEventRequest,
  IEvent,
  IEventResponse,
} from '@/types';

import { createEvent, updateEvent, deleteEvent, deleteEvents } from '@/api';
import usePosthog from '@/hooks/usePosthog';
import queryClient from '@/lib/query-client';

interface IGetEvent {
  event: IEvent;
  responses: IEventResponse[];
}

export const useCreateEvent = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: CreateEventRequest) => {
      const response = await createEvent(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (res) => {
      queryClient.setQueryData<{ events: IEvent[] }>(['events'], (previous) => {
        if (!previous) return { events: [res.data.event] };
        return { events: [...previous.events, res.data.event] };
      });

      posthog.capture('event_created');
    },
  });
};

export const useUpdateEvent = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: UpdateEventRequest) => {
      const response = await updateEvent(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ['events'] });
      queryClient.setQueryData<IGetEvent>(
        ['event', res.data.event._id],
        (prev) => {
          if (!prev) return;
          return {
            event: res.data.event,
            responses: prev.responses,
          };
        },
      );

      posthog.capture('event_updated');
    },
  });
};

export const useDeleteEvent = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: DeleteEventRequest) => {
      const response = await deleteEvent(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['event', variables.id],
      });
      queryClient.setQueryData<{ events: IEvent[] }>(['events'], (prev) => ({
        events: prev?.events.filter((e) => e._id !== variables.id) || [],
      }));

      posthog.capture('event_deleted');
    },
  });
};

export const useDeleteEvents = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async () => {
      const response = await deleteEvents();
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async () => {
      queryClient.setQueryData<{ events: IEvent[] }>(['events'], {
        events: [],
      });

      posthog.capture('events_deleted');
    },
  });
};

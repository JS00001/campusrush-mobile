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
} from '@/types';

import { createEvent, updateEvent, deleteEvent, deleteEvents } from '@/api';

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: async (data: CreateEventRequest) => {
      const response = await createEvent(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: async (data: UpdateEventRequest) => {
      const response = await updateEvent(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: async (data: DeleteEventRequest) => {
      const response = await deleteEvent(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useDeleteEvents = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await deleteEvents();
      if ('error' in response) throw response;
      return response;
    },
  });
};

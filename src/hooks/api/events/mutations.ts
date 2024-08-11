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

import { useMutation } from "@tanstack/react-query";

import { createEvent, updateEvent, deleteEvent, deleteEvents } from "@/api";

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: (data: CreateEventRequest) => {
      return createEvent(data);
    },
  });
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: (data: UpdateEventRequest) => {
      return updateEvent(data);
    },
  });
};

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: (data: DeleteEventRequest) => {
      return deleteEvent(data);
    },
  });
};

export const useDeleteEvents = () => {
  return useMutation({
    mutationFn: () => {
      return deleteEvents();
    },
  });
};

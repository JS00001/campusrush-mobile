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

import { useQuery } from '@tanstack/react-query';

import { getEvent, getEvents } from '@/api';

/**
 * Get all of the events the chapter has
 */
export const useGetEvents = () => {
  const query = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await getEvents();
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

/**
 * Get a specific event by its ID
 */
export const useGetEvent = (id: string) => {
  const query = useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const response = await getEvent({ id });
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

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

import { getPnms, getPnm, getPnmResponses } from '@/api';

/**
 * Get all of the PNMs the chapter has
 */
export const useGetPnms = () => {
  const query = useQuery({
    queryKey: ['pnms'],
    queryFn: async () => {
      const response = await getPnms();
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

/**
 * Get a specific PNM by their ID
 */
export const useGetPnm = (id: string) => {
  const query = useQuery({
    queryKey: ['pnm', id],
    queryFn: async () => {
      const response = await getPnm({ id });
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

/**
 * Get a specific PNM's form responses
 */
export const useGetPnmResponses = (id: string) => {
  const query = useQuery({
    queryKey: ['pnm-responses', id],
    queryFn: async () => {
      const response = await getPnmResponses({ id });
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

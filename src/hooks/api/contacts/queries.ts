/*
 * Created on Sun Aug 11 2024
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

import { getContacts } from '@/api';

/**
 * Get the list of contacts for the chapter
 */
export const useGetContacts = () => {
  const query = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await getContacts();
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

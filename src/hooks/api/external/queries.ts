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

import { getMetadata } from '@/api';

export const useGetMetadata = () => {
  return useQuery({
    queryKey: ['metadata'],
    queryFn: async () => {
      const response = await getMetadata();
      if ('error' in response) throw response;
      return response.data;
    },
  });
};

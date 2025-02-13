/*
 * Created on Sat Nov 30 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';

import { getForm, getFormResponses, getForms } from '@/api';

/**
 * Get all of the forms the chapter has
 */
export const useGetForms = () => {
  const query = useQuery({
    queryKey: ['forms'],
    queryFn: async () => {
      const response = await getForms();
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

/**
 * Get a specific form by its ID
 */
export const useGetForm = (id: string) => {
  const query = useQuery({
    staleTime: 0,
    queryKey: ['form', id],
    queryFn: async () => {
      const response = await getForm({ id });
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

/**
 * Get form responses for a specific form
 */
export const useGetFormResponses = (id: string, search: string = '') => {
  const [debouncedSearch] = useDebounce(search, 300);

  const query = useQuery({
    queryKey: ['formResponses', id, debouncedSearch],
    placeholderData: (prev) => prev,
    queryFn: async () => {
      const response = await getFormResponses({ id, search: debouncedSearch });
      if ('error' in response) throw response;
      return response.data;
    },
  });

  return query;
};

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
  CreatePnmRequest,
  UpdatePnmRequest,
  DeletePnmRequest,
} from '@/types';

import { createPnm, deletePnm, deletePnms, updatePnm } from '@/api';

export const useDeletePnms = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await deletePnms();
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useCreatePnm = () => {
  return useMutation({
    mutationFn: async (data: CreatePnmRequest) => {
      const response = await createPnm(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useUpdatePnm = () => {
  return useMutation({
    mutationFn: async (data: UpdatePnmRequest) => {
      const response = await updatePnm(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

export const useDeletePnm = () => {
  return useMutation({
    mutationFn: async (data: DeletePnmRequest) => {
      const response = await deletePnm(data);
      if ('error' in response) throw response;
      return response;
    },
  });
};

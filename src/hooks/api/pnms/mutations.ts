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
    mutationFn: () => {
      return deletePnms();
    },
  });
};

export const useCreatePnm = () => {
  return useMutation({
    mutationFn: (data: CreatePnmRequest) => {
      return createPnm(data);
    },
  });
};

export const useUpdatePnm = () => {
  return useMutation({
    mutationFn: (data: UpdatePnmRequest) => {
      return updatePnm(data);
    },
  });
};

export const useDeletePnm = () => {
  return useMutation({
    mutationFn: (data: DeletePnmRequest) => {
      return deletePnm(data);
    },
  });
};

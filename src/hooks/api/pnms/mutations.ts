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
  DeletePnmsRequest,
  IPNM,
} from '@/types';

import usePosthog from '@/hooks/usePosthog';
import queryClient from '@/lib/query-client';
import { createPnm, deletePnm, deletePnms, updatePnm } from '@/api';

/**
 * Delete a list of pnms, or all pnms, then update the cache
 * with the returned existing pnms
 */
export const useDeletePnms = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data?: DeletePnmsRequest) => {
      const response = await deletePnms(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (res, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['contacts'] });
      await queryClient.invalidateQueries({ queryKey: ['conversations'] });

      await queryClient.setQueryData(['pnms'], { pnms: res.data.pnms });
      posthog.capture('pnms_deleted', { count: variables?.pnms?.length || 0 });
    },
  });
};

/**
 * Create a new pnm, then update the cache with the returned pnm
 * and refetch the contacts query
 */
export const useCreatePnm = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: CreatePnmRequest) => {
      const response = await createPnm(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ['contacts'] });

      queryClient.setQueryData<{ pnms: IPNM[] }>(['pnms'], (previous) => {
        if (!previous) return { pnms: [res.data.pnm] };
        return { pnms: [...previous.pnms, res.data.pnm] };
      });

      posthog.capture('pnm_created');
    },
  });
};

/**
 * Update a pnm, then update the cache with the returned pnm
 * and refetch the contacts query
 */
export const useUpdatePnm = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: UpdatePnmRequest) => {
      const response = await updatePnm(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (res) => {
      await queryClient.refetchQueries({ queryKey: ['pnms'] });
      await queryClient.refetchQueries({ queryKey: ['contacts'] });

      queryClient.setQueryData(['pnm', res.data.pnm._id], {
        pnm: res.data.pnm,
      });

      posthog.capture('pnm_updated');
    },
  });
};
/**
 * Delete a pnm, then update the cache with the returned existing pnms
 * // TODO: Update all of these comments, explaining cache changes
 */
export const useDeletePnm = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: DeletePnmRequest) => {
      const response = await deletePnm(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (_, variables) => {
      await queryClient.refetchQueries({ queryKey: ['contacts'] });
      await queryClient.refetchQueries({ queryKey: ['conversations'] });
      await queryClient.invalidateQueries({ queryKey: ['pnm', variables.id] });

      queryClient.setQueryData<{ pnms: IPNM[] }>(['pnms'], (previous) => ({
        pnms: previous?.pnms.filter((pnm) => pnm._id !== variables.id) || [],
      }));

      posthog.capture('pnm_deleted');
    },
  });
};

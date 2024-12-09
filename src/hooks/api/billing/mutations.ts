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

import { purchasePhoneNumber } from '@/api';
import usePosthog from '@/hooks/usePosthog';
import queryClient from '@/lib/query-client';
import { PurchasePhoneNumberRequest } from '@/@types';

export const usePurchasePhoneNumber = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: PurchasePhoneNumberRequest) => {
      const response = await purchasePhoneNumber(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ['user'] });
      posthog.capture('purchase_phone_number');
    },
  });
};

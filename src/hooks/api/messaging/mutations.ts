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

import { InfiniteData, useMutation } from '@tanstack/react-query';

import type {
  IConversation,
  SendDirectMessageRequest,
  SendMassMessageRequest,
} from '@/types';

import usePosthog from '@/hooks/usePosthog';
import queryClient from '@/lib/query-client';
import { sendMassMessage, sendDirectMessage } from '@/api';

type IGetConversation = InfiniteData<{ conversation?: IConversation }>;

export const useSendMassMessage = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: SendMassMessageRequest) => {
      const response = await sendMassMessage(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.refetchQueries({ queryKey: ['contacts'] });
      posthog.capture('MASS_MESSAGE_SENT', {
        target_count: variables.pnms.length,
      });
    },
  });
};

export const useSendDirectMessage = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: SendDirectMessageRequest) => {
      const response = await sendDirectMessage(data);
      if ('error' in response) throw response;
      return response;
    },
    onMutate: async (data) => {
      // Optimistically update the UI
      await queryClient.cancelQueries({ queryKey: ['conversations'] });
      await queryClient.cancelQueries({ queryKey: ['conversation', data.pnm] });

      const previousResponse = queryClient.getQueryData<IGetConversation>([
        'conversation',
        data.pnm,
      ]);

      queryClient.addMessage(data.pnm, data);

      return { previousResponse };
    },
    onError: (_, variables, context) => {
      // Rollback to the previous state
      queryClient.setQueryData<IGetConversation>(
        ['conversation', variables.pnm],
        context?.previousResponse,
      );
    },
    onSettled: (res) => {
      // Refetch the conversations list and the conversation
      const pnmId = res?.data.conversation.pnm;
      queryClient.refetchQueries({ queryKey: ['contacts'] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['conversation', pnmId] });
      posthog.capture('DIRECT_MESSAGE_SENT');
    },
  });
};

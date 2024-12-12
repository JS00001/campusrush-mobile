/*
 * Created on Fri Aug 16 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import {
  InfiniteData,
  QueryClient as RQQueryClient,
} from '@tanstack/react-query';
import { produce } from 'immer';
import { AxiosError } from 'axios';

import { IConversation, IMessage, SendDirectMessageRequest } from '@/types';

type IGetConversation = InfiniteData<{ conversation?: IConversation }>;

type IGetConversations = InfiniteData<{
  conversations?: IConversation[];
  unreadCount: number;
}>;

/**
 * Query client with helper methods for updating states
 */
class QueryClient extends RQQueryClient {
  /**
   * Mark a conversation as read in the conversations
   * query
   */
  public readConversation(pnmId: string) {
    this.setQueriesData<IGetConversations>(
      { queryKey: ['conversations'] },
      (oldData) => {
        return produce(oldData, (draft) => {
          if (!draft) return;

          const page = draft.pages.find((page) => {
            return page.conversations?.some((c) => c.pnm._id === pnmId);
          });

          if (!page) return;

          const conversation = page.conversations?.find((c) => {
            return c.pnm._id === pnmId;
          });

          if (!conversation) return;
          // If the old conversation was not read, then we need to mark
          // the page as read
          if (!conversation.read) {
            draft.pages[draft.pages.length - 1].unreadCount -= 1;
          }
          conversation.read = true;
        });
      },
    );
  }

  /**
   * Add a message to a conversation
   */
  public addMessage(pnmId: string, data: SendDirectMessageRequest) {
    const newMessage: IMessage = {
      _id: 'optimistic',
      chapter: 'optimistic',
      sent: true,
      pnm: data.pnm,
      error: false,
      content: data.message,
      attachments: data.attachments,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.setQueryData<IGetConversation>(['conversation', pnmId], (oldData) => {
      return produce(oldData, (draft) => {
        if (!draft?.pages.length) return;

        const firstPage = draft.pages[0];

        if (firstPage.conversation?.messages) {
          firstPage.conversation.messages.unshift(newMessage);
          return;
        }

        firstPage.conversation = { messages: [newMessage] } as IConversation;
      });
    });
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry(failureCount, error) {
        const isAxiosError = error instanceof AxiosError;

        if (!isAxiosError) {
          return false;
        }

        const status = error.response?.status ?? 0;

        // Check if the error is a 4XX or 5XX error
        if (status >= 400 && status <= 600) {
          return false;
        }

        // Retry up to 3 times
        if (failureCount < 3) {
          return true;
        }

        return false;
      },
    },
  },
});

export default queryClient;

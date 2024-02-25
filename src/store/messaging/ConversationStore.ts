/*
 * Created on Sat Feb 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { create } from 'zustand';
import { PersistStorage, persist } from 'zustand/middleware';

import customAsyncStorage from '@/lib/asyncStorage';

interface IConversationStore {
  conversations: Conversation[];

  clear: () => void;

  getConversation: (pnmId: string) => Conversation | undefined;
  removeConversation: (pnmId: string) => void;
  updateConversation: (conversation: Conversation) => void;
  setConversations: (conversations: Conversation[]) => void;
  addConversations: (conversations: Conversation[] | Conversation) => void;
}

export const useConversationStore = create<IConversationStore>()(
  persist(
    (set, get) => {
      /**
       * The initial state of the store
       */
      const initialState = {
        conversations: [],
      };

      /**
       * Clears the store
       */
      const clear = () => {
        return set(initialState);
      };

      /**
       * Gets a conversation from the store for a specific pnmId
       */
      const getConversation = (pnmId: string) => {
        return get().conversations.find((c) => {
          return c.pnm._id === pnmId;
        });
      };

      /**
       * Removes a conversation from the store for a specific pnmId
       */
      const removeConversation = (pnmId: string) => {
        return set((state) => {
          const filteredConversations = state.conversations.filter((c) => {
            return c.pnm._id !== pnmId;
          });

          return {
            conversations: filteredConversations,
          };
        });
      };

      /**
       * Updates a conversation in the store
       */
      const updateConversation = (conversation: Conversation) => {
        return set((state) => {
          const updatedConversations = state.conversations.map((c) => {
            return c._id === conversation._id ? conversation : c;
          });

          return {
            conversations: updatedConversations,
          };
        });
      };

      /**
       * Sets conversations in the store
       */
      const setConversations = (conversations: Conversation[]) => {
        return set((state) => ({
          conversations,
        }));
      };

      /**
       * Adds conversations to the store (but does not add duplicates)
       */
      // prettier-ignore
      const addConversations = (conversations: Conversation[] | Conversation) => {
        return set((state) => {
          const newConversations = Array.isArray(conversations)
            ? conversations
            : [conversations];

          const newConversationIds = newConversations.map((c) => c._id);

          const currentConversations = state.conversations;
          const filteredCurrentConversations = currentConversations.filter((c) => {
            return !newConversationIds.includes(c._id);
          });

          return {
            conversations: [ ...newConversations, ...filteredCurrentConversations],
          };
        });
      };

      return {
        ...initialState,
        clear,
        getConversation,
        removeConversation,
        updateConversation,
        setConversations,
        addConversations,
      };
    },
    {
      name: 'conversation-store',
      storage: customAsyncStorage as PersistStorage<IConversationStore>,
    },
  ),
);

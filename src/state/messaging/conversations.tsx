/*
 * Created on Sun Oct 22 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { create } from "zustand";
import { PersistStorage, persist } from "zustand/middleware";

import customAsyncStorage from "@/lib/asyncStorage";

export enum ConversationStatus {
  Idle = "IDLE",
  Sending = "SENDING",
  Sent = "SENT",
  Failed = "FAILED",
}

const defaultState = {
  conversations: [],
  status: ConversationStatus.Idle,
};

export interface ConversationsState {
  status: ConversationStatus;
  conversations: Conversation[];

  resetState: () => void;

  setStatus: (status: ConversationStatus) => void;

  getConversation: (pnmId: string) => Conversation | undefined;
  deleteConversation: (pnmId: string) => void;
  updateConversation: (conversation: Conversation) => void;
  addConversations: (conversation: Conversation[]) => void;
  setConversations: (conversations: Conversation[]) => void;
}

const useConversationsStore = create<ConversationsState>()(
  persist(
    (set, get) => ({
      /**
       * The default state of the store
       */
      ...defaultState,

      /**
       * Gets the conversation with the given pnmId
       */
      getConversation: (pnmId) => {
        return get().conversations.find((c) => c.pnm._id === pnmId);
      },
      /**
       * Updates a conversation in the store if its id exists
       */
      updateConversation: (conversation) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c._id === conversation._id ? conversation : c,
          ),
        })),
      /**
       * Adds a list of conversations to the store
       */
      addConversations: (conversations) =>
        set((state) => {
          const previousConversations = state.conversations;

          const filteredConversations = previousConversations.filter(
            (conversation) =>
              !conversations.find((c) => c._id === conversation._id),
          );

          return {
            conversations: [...conversations, ...filteredConversations],
          };
        }),
      /**
       * Sets the list of conversations in the store
       */
      setConversations: (conversations) =>
        set(() => ({
          conversations,
        })),
      /**
       * Sets the status of the conversations
       */
      setStatus: (status) =>
        set(() => ({
          status,
        })),
      /**
       * Deletes a conversation from the store
       */
      deleteConversation: (pnmId) =>
        set((state) => ({
          conversations: state.conversations.filter((c) => c.pnm._id !== pnmId),
        })),
      /**
       * Resets the state to the default state
       */
      resetState: () => set(() => defaultState),
    }),
    {
      name: "conversations-store",
      storage: customAsyncStorage as PersistStorage<ConversationsState>,
    },
  ),
);

export default useConversationsStore;

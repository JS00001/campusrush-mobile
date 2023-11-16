/*
 * Created on Wed Nov 15 2023
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

const MAX_MESSAGES = 20;

const defaultState = {
  messages: {},
};

interface MessagesState {
  messages: {
    [key: string]: Message[];
  };

  resetState: () => void;

  clearMessages: (pnmId: string) => void;
  addMessages: (messages: Message[]) => void;
}

const useMessagesStore = create<MessagesState>()(
  persist(
    (set) => ({
      ...defaultState,
      /**
       * Resets the state to the default state
       */
      resetState: () => set(() => defaultState),
      /**
       * Clears the messages for a PNM
       */
      clearMessages: (pnmId) =>
        set((state) => {
          const updatedMessages = { ...state.messages };
          delete updatedMessages[pnmId];

          return {
            messages: updatedMessages,
          };
        }),
      /**
       * Adds messages for a PNM
       */
      addMessages: (messages) =>
        set((state) => {
          // First, go through the messages and sort them by their pnmId
          const sortedMessages = messages.reduce(
            (acc, message) => {
              if (!acc[message.pnm]) {
                acc[message.pnm] = [];
              }

              // Check if the message already exists in the st
              const alreadyExists = state.messages[message.pnm]?.find(
                (m) => m._id === message._id,
              );

              // Check if the data is test data
              const isTestData = message._id === "temp";

              if (!alreadyExists && !isTestData) {
                acc[message.pnm].push(message);
              }

              return acc;
            },
            {} as { [key: string]: Message[] },
          );

          // Then, go through each pnmId and add the messages to the state
          return {
            messages: {
              ...state.messages,
              ...Object.keys(sortedMessages).reduce(
                (acc, pnmId) => ({
                  ...acc,
                  [pnmId]: [
                    ...sortedMessages[pnmId],
                    ...(state.messages[pnmId] || []),
                  ].slice(0, MAX_MESSAGES),
                }),
                {} as { [key: string]: Message[] },
              ),
            },
          };
        }),
    }),
    {
      name: "messages",
      storage: customAsyncStorage as PersistStorage<MessagesState>,
    },
  ),
);

export default useMessagesStore;

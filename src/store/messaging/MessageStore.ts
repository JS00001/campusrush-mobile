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

import type { IMessage } from '@/types';

interface IMessageStore {
  messages: { [pnmId: string]: IMessage[] };

  clear: () => void;

  getMessages: (pnmId: string) => IMessage[] | undefined;
  setMessages: (pnmId: string, messages: IMessage[]) => void;
  addMessages: (messages: IMessage[] | IMessage) => void;
  removeMessage: (pnmId: string, messageId: string) => void;
  replaceMessage: (pnmId: string, messageId: string, message: IMessage) => void;
}

export const useMessageStore = create<IMessageStore>()((set, get) => {
  /**
   * The initial state of the store
   */
  const initialState = {
    messages: {},
  };

  /**
   * Clears the store
   */
  const clear = () => {
    return set(initialState);
  };

  /**
   * Gets messages from the store for a specific pnmId
   */
  const getMessages = (pnmId: string) => {
    return get().messages[pnmId];
  };

  /**
   * Sets messages for a specific pnmId
   */
  const setMessages = (pnmId: string, messages: IMessage[]) => {
    return set((state) => {
      return {
        messages: {
          ...state.messages,
          [pnmId]: messages,
        },
      };
    });
  };

  /**
   * Adds messages to the store, but does not add duplicate
   * message ids
   */
  const addMessages = (messages: IMessage[] | IMessage) => {
    return set((state) => {
      const messagesArray = Array.isArray(messages) ? messages : [messages];

      // Group messages by pnmId
      const groupedMessages = messagesArray.reduce((acc, message) => {
        const pnmId = message.pnm;

        const existingMessages = state.messages[pnmId] || [];
        const currentMessages = acc[pnmId] || [];

        return {
          ...acc,
          [pnmId]: [message, ...currentMessages, ...existingMessages],
        };
      }, {});

      // Add the grouped messages to the store
      return {
        messages: {
          ...state.messages,
          ...groupedMessages,
        },
      };
    });
  };

  /**
   * Removes a message from the store
   */
  const removeMessage = (pnmId: string, messageId: string) => {
    return set((state) => {
      const currentMessages = state.messages[pnmId] || [];
      const filteredCurrentMessages = currentMessages.filter(
        (message) => message._id !== messageId,
      );

      return {
        messages: {
          ...state.messages,
          [pnmId]: filteredCurrentMessages,
        },
      };
    });
  };

  /**
   * Replaces a message in the store (with the same messageId)
   */
  const replaceMessage = (
    pnmId: string,
    messageId: string,
    message: IMessage,
  ) => {
    return set((state) => {
      const currentMessages = state.messages[pnmId] || [];
      const newMessages = currentMessages.map((currentMessage) => {
        return currentMessage._id === messageId ? message : currentMessage;
      });

      return {
        messages: {
          ...state.messages,
          [pnmId]: newMessages,
        },
      };
    });
  };

  return {
    ...initialState,
    clear,
    getMessages,
    setMessages,
    addMessages,
    removeMessage,
    replaceMessage,
  };
});

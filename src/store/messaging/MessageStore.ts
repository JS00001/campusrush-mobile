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

interface IMessageStore {
  messages: { [pnmId: string]: Message[] };

  clear: () => void;

  getMessages: (pnmId: string) => Message[] | undefined;
  setMessages: (pnmId: string, messages: Message[]) => void;
  addMessages: (pnmId: string, messages: Message[] | Message) => void;
  removeMessage: (pnmId: string, messageId: string) => void;
  replaceMessage: (pnmId: string, messageId: string, message: Message) => void;
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
  const setMessages = (pnmId: string, messages: Message[]) => {
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
  const addMessages = (pnmId: string, messages: Message[] | Message) => {
    return set((state) => {
      const newMessages = Array.isArray(messages) ? messages : [messages];
      const newMessageIds = newMessages.map((message) => message._id);

      const currentMessages = state.messages[pnmId] || [];
      const filteredCurrentMessages = currentMessages.filter((message) => {
        return !newMessageIds.includes(message._id);
      });

      return {
        messages: {
          ...state.messages,
          [pnmId]: [...newMessages, ...filteredCurrentMessages],
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
    message: Message,
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

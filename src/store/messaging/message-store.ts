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

interface IMessageState {
  messages: { [pnmId: string]: IMessage[] };
}

interface IMessageStore extends IMessageState {
  /** Clear the store */
  clear: () => void;
  /** Get messages from the store for a specific pnmId */
  getMessages: (pnmId: string) => IMessage[] | undefined;
  /** Set messages for a specific pnmId */
  setMessages: (pnmId: string, messages: IMessage[]) => void;
  /** Add messages to the store */
  addOrUpdateMessages: (messages: IMessage[] | IMessage) => void;
  /** Remove a message from the store */
  removeMessage: (pnmId: string, messageId: string) => void;
  /** Replace a message in the store */
  replaceMessage: (pnmId: string, messageId: string, message: IMessage) => void;
}

export const useMessageStore = create<IMessageStore>()((set, get) => {
  const initialState: IMessageState = {
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
  const addOrUpdateMessages = (messages: IMessage[] | IMessage) => {
    return set((state) => {
      const messagesArray = Array.isArray(messages) ? messages : [messages];

      const groupedMessages = messagesArray.reduce((acc, message) => {
        const pnmId = message.pnm;
        const messageId = message._id;

        if (!acc[pnmId]) {
          acc[pnmId] = state.messages[pnmId] ? [...state.messages[pnmId]] : [];
        }

        const existingMessageIndex = acc[pnmId].findIndex((msg: IMessage) => {
          return msg._id === messageId;
        });

        if (existingMessageIndex !== -1) {
          acc[pnmId][existingMessageIndex] = message;
        } else {
          acc[pnmId].unshift(message);
        }

        return acc;
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
    addOrUpdateMessages,
    removeMessage,
    replaceMessage,
  };
});

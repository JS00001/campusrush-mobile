/*
 * Created on Mon Nov 27 2023
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

const defaultState = {
  messages: {},
};

export interface MessagesState {
  messages: {
    [key: string]: Message[];
  };

  resetState: () => void;

  getMessages: (pnmId: string) => Message[] | undefined;
  addMessages: (pnmId: string, messages: Message[]) => void;
  addMessage: (pnmId: string, message: Message) => void;
  setMessages: (pnmId: string, messages: Message[]) => void;
  replaceMessage: (
    pnmId: string,
    prevMessageId: string,
    message: Message,
  ) => void;
}

const useMessagesStore = create<MessagesState>((set, get) => ({
  /**
   * The default state of the store
   */
  ...defaultState,

  /**
   * Clears the store
   */
  resetState: () => set(() => defaultState),

  /**
   * Gets the messages with the given pnmId
   */
  getMessages: (pnmId) => {
    return get().messages[pnmId];
  },
  /**
   * Adds messages to the store
   */
  addMessages: (pnmId, messages) => {
    set((prev) => {
      const prevMessages = prev.messages[pnmId] || [];

      // Remove duplicates from the passed in messages
      const filteredMessages = messages.filter(
        (message) => !prevMessages.find((m) => m._id === message._id),
      );

      // The messages to update
      const updatedMessages = [...filteredMessages, ...prevMessages];

      return {
        messages: {
          ...prev.messages,
          [pnmId]: updatedMessages,
        },
      };
    });
  },
  /**
   * Adds a message to the store
   */
  addMessage: (pnmId, message) => {
    set((prev) => {
      const prevMessages = prev.messages[pnmId] || [];

      // Don't add the message if it already exists
      if (prevMessages.find((m) => m._id === message._id)) return prev;

      // The messages to update
      const updatedMessages = [message, ...prevMessages];

      return {
        messages: {
          ...prev.messages,
          [pnmId]: updatedMessages,
        },
      };
    });
  },
  /**
   * Sets the messages of a pnm
   */
  setMessages: (pnmId, messages) => {
    set((prev) => ({
      messages: {
        ...prev.messages,
        [pnmId]: messages,
      },
    }));
  },
  /**
   * Replaces a message in the store
   */
  replaceMessage: (pnmId, prevMessageId, message) => {
    set((prev) => {
      const prevMessages = prev.messages[pnmId] || [];

      const updatedMessages = prevMessages.map((m) => {
        if (m._id === prevMessageId) return message;
        return m;
      });

      return {
        messages: {
          ...prev.messages,
          [pnmId]: updatedMessages,
        },
      };
    });
  },
}));

export default useMessagesStore;

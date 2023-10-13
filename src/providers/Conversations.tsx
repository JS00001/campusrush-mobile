/*
 * Created on Fri Oct 6 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "@/providers/Auth";
import messagingApi from "@/api/api/messaging";

export enum ConversationStatus {
  Idle = "IDLE",
  Sending = "SENDING",
  Sent = "SENT",
  Failed = "FAILED",
}
export interface ConversationsContextProps {
  isLoading: boolean;
  status: ConversationStatus;
  conversations: Conversation[];
  refetch: () => Promise<void>;
  setStatus: (status: ConversationStatus) => void;
  setConversationAsRead: (pnmId: string) => void;
  addConversations: (conversations: Conversation[]) => void;
}

const ConversationsContext = createContext<ConversationsContextProps>(
  {} as ConversationsContextProps,
);

const ConversationsProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  // Import data from auth provider
  const { accessToken } = useAuth();
  // Create a state to store the conversations
  const [conversations, setConversations] = useState<Conversation[]>([]);
  // Create a status state for the conversations
  const [_status, _setStatus] = useState<ConversationStatus>(
    ConversationStatus.Idle,
  );

  // The query to get conversations
  const query = useQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["conversations", accessToken],
    queryFn: async () => {
      return await messagingApi.getConversations();
    },
  });

  useEffect(() => {
    // Convert the data into a readable format
    const conversationsData = query.data?.data?.data.conversations || [];
    // Set the conversations state
    setConversations(conversationsData);
  }, [query.data]);

  useEffect(() => {
    // If a message has been sent, remove the status after 2 seconds
    if (_status === ConversationStatus.Sent) {
      setTimeout(() => {
        _setStatus(ConversationStatus.Idle);
      }, 2000);
    }
  }, [_status]);

  // The method to add a conversation to the state
  const addConversations = (_conversations: Conversation[]) => {
    // go through the current state, if a conversation has the same id as one in _conversations, remove it
    // then add all new conversations to the state
    setConversations((prevConversations) => {
      const filteredConversations = prevConversations.filter(
        (conversation) =>
          // If the conversation is not in the new conversations, keep it
          !_conversations.find(
            (_conversation) => _conversation.pnm._id === conversation.pnm._id,
          ),
      );

      return [..._conversations, ...filteredConversations];
    });
  };

  // Method to set a conversation as read
  const setConversationAsRead = (pnmId: string) => {
    // Set the conversation as read
    setConversations((prevConversations) => {
      return prevConversations.map((conversation) => {
        // If the conversation is the one being read, set it as read
        if (conversation.pnm._id === pnmId) {
          return {
            ...conversation,
            read: true,
          };
        }

        // Otherwise, return the conversation as is
        return conversation;
      });
    });
  };

  // Method to refetch the query
  const refetch = async () => {
    await query.refetch();
  };

  return (
    <ConversationsContext.Provider
      value={{
        refetch,
        isLoading: query.isLoading,
        status: _status,
        setStatus: _setStatus,
        conversations,
        addConversations,
        setConversationAsRead,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversations = () => useContext(ConversationsContext);

export default ConversationsProvider;

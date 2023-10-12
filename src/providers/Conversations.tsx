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
  idle = "idle",
  sending = "sending",
  sent = "sent",
  failed = "failed",
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
    ConversationStatus.idle,
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
    if (_status === ConversationStatus.sent) {
      setTimeout(() => {
        _setStatus(ConversationStatus.idle);
      }, 2000);
    }
  }, [_status]);

  // The method to add a conversation to the state
  const addConversations = (conversations: Conversation[]) => {
    // Add the conversation to the state if the conversation _id does not exist
    // else update the conversation
    setConversations((prevConversations) => {
      const newConversations = conversations.map((conversation) => {
        // Check if the conversation exists in the state
        const conversationIndex = prevConversations.findIndex(
          (prevConversation) => prevConversation._id === conversation._id,
        );

        // If the conversation does not exist, add it to the state
        if (conversationIndex === -1) {
          return conversation;
        }

        // If the conversation exists, update it
        return {
          ...prevConversations[conversationIndex],
          ...conversation,
        };
      });

      // Return the new conversations
      return [...newConversations, ...prevConversations];
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

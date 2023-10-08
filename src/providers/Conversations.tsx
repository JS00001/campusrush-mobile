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

interface ConversationsContextProps {
  isLoading: boolean;
  isSendingMessage: boolean;
  conversations: Conversation[];
  setIsSendingMessage: (isSendingMessage: boolean) => void;
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
  // Create a state for whether a sent message is loading
  const [_isSendingMessage, _setIsSendingMessage] = useState(false);
  // Create a state to store the conversations
  const [conversations, setConversations] = useState<Conversation[]>([]);

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

  // The method to set whether a message is loading
  const setIsSendingMessage = (isSendingMessage: boolean) => {
    _setIsSendingMessage(isSendingMessage);
  };

  // The method to add a conversation to the state
  const addConversations = (conversations: Conversation[]) => {
    // Add the conversation to the state if the conversation _id does not exist
    // else update the conversation
    setConversations((prevConversations) => {
      return conversations.map((conversation) => {
        const conversationIndex = prevConversations.findIndex(
          (prevConversation) => prevConversation._id === conversation._id,
        );

        if (conversationIndex === -1) {
          return conversation;
        }

        return {
          ...prevConversations[conversationIndex],
          ...conversation,
        };
      });
    });
  };

  return (
    <ConversationsContext.Provider
      value={{
        isLoading: query.isLoading,
        isSendingMessage: _isSendingMessage,
        setIsSendingMessage,
        conversations,
        addConversations,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversations = () => useContext(ConversationsContext);

export default ConversationsProvider;

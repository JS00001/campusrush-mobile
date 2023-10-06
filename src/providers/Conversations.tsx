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
import { createContext, useContext, useState } from "react";

import { useAuth } from "@/providers/Auth";
import messagingApi from "@/api/api/messaging";

interface ConversationsContextProps {
  isLoading: boolean;
  conversations: Conversation[];
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

  // The query to get conversations
  const query = useQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["conversations", accessToken],
    queryFn: async () => {
      return await messagingApi.getConversations();
    },
  });

  // Convert the data into a readable format
  const conversationsData = query.data?.data?.data.conversations || [];
  // Create a state to store the conversations
  const [conversations, setConversations] =
    useState<Conversation[]>(conversationsData);

  // The method to add a conversation to the state
  const addConversations = (conversations: Conversation[]) => {
    setConversations((prevConversations) => {
      return [...prevConversations, ...conversations];
    });
  };

  return (
    <ConversationsContext.Provider
      value={{
        isLoading: query.isLoading,
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

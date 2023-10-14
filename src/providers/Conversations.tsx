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
import { MenuAction } from "@react-native-menu/menu";
import { createContext, useContext, useEffect, useState } from "react";

import { useAuth } from "@/providers/Auth";
import messagingApi from "@/api/api/messaging";

export enum ConversationStatus {
  Idle = "IDLE",
  Sending = "SENDING",
  Sent = "SENT",
  Failed = "FAILED",
}

export enum ConversationFilter {
  NoFilter = "NO_FILTER",
  Unread = "UNREAD",
}

export interface ConversationsContextProps {
  isLoading: boolean;
  searchQuery: string;
  filterActions: MenuAction[];
  status: ConversationStatus;
  conversations: Conversation[];

  refetch: () => Promise<void>;
  onFilterPress: (e: any) => void;
  setSearchQuery: (query: string) => void;
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
  // Create a state to store filtered conversations
  const [filteredConversations, setFilteredConversations] = useState<
    Conversation[]
  >([]);

  // All filtering options
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<ConversationFilter>(
    ConversationFilter.NoFilter,
  );

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

  // When the query loads, set the conversations
  useEffect(() => {
    if (query.data) {
      const formattedConversations = query.data.data.data.conversations;

      setConversations(formattedConversations);
    }
  }, [query.data]);

  // If a message has been sent, remove the status after 2 seconds
  useEffect(() => {
    if (_status === ConversationStatus.Sent) {
      setTimeout(() => {
        _setStatus(ConversationStatus.Idle);
      }, 2000);
    }
  }, [_status]);

  // When the query first loads, or when the search query or selected filter changes, filter the Conversations
  useEffect(() => {
    // First, filter all the conversations based on the search query, by full name or phone number
    const matchedConversations = conversations.filter((conversation) => {
      const pnmFullName = `${conversation.pnm.firstName} ${conversation.pnm.lastName}`;

      // Return true if the full name or phone number includes the search query
      return (
        conversation.lastMessage
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        pnmFullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Then, filter the matched Conversations based on the selected filter
    switch (selectedFilter) {
      case ConversationFilter.Unread:
        const unreadConversations = matchedConversations.filter(
          (conversation) => !conversation.read,
        );
        setFilteredConversations(unreadConversations);
        break;
      case ConversationFilter.NoFilter:
        setFilteredConversations(matchedConversations);
        break;
      default:
        break;
    }
  }, [searchQuery, selectedFilter, conversations]);

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

  // Handle the filter press event
  const onFilterPress = (e: any) => {
    const eventId = e.nativeEvent.event as ConversationFilter;

    setSelectedFilter(eventId);
  };

  // Method to refetch the query
  const refetch = async () => {
    await query.refetch();
  };

  // The actions for the filter menu
  const filterActions: MenuAction[] = [
    {
      id: ConversationFilter.NoFilter,
      title: "No Filters",
      image: "xmark",
      state: selectedFilter === ConversationFilter.NoFilter ? "on" : "off",
    },
    {
      id: ConversationFilter.Unread,
      title: "Unread Messages",
      image: "message",
      state: selectedFilter === ConversationFilter.Unread ? "on" : "off",
    },
  ];

  return (
    <ConversationsContext.Provider
      value={{
        searchQuery,
        filterActions,
        status: _status,
        isLoading: query.isLoading,
        conversations: filteredConversations,

        refetch,
        onFilterPress,
        setSearchQuery,
        addConversations,
        setConversationAsRead,
        setStatus: _setStatus,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversations = () => useContext(ConversationsContext);

export default ConversationsProvider;

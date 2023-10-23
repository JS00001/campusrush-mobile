/*
 * Created on Sun Oct 22 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MenuAction } from "@react-native-menu/menu";

import { useAuth } from "@/providers/Auth";
import messagingApi from "@/api/api/messaging";
import useConversationsStore from "@/state/conversations";
import { ConversationStatus } from "@/state/conversations";

export enum ConversationFilter {
  NoFilter = "NO_FILTER",
  Unread = "UNREAD",
}

const useConversations = () => {
  // Import data from auth provider
  const { accessToken } = useAuth();

  // Pull the conversations state from the store
  const {
    status,
    conversations,
    setStatus,
    setConversations,
    updateConversation,
    addConversations,
  } = useConversationsStore();

  // Create a state to store filtered conversations
  const [filteredConversations, setFilteredConversations] = useState<
    Conversation[]
  >([]);

  // All filtering options
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<ConversationFilter>(
    ConversationFilter.NoFilter,
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
    if (status === ConversationStatus.Sent) {
      setTimeout(() => {
        setStatus(ConversationStatus.Idle);
      }, 2000);
    }
  }, [status]);

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

  // Method to set a conversation as read
  const setConversationAsRead = (pnmId: string) => {
    conversations.map((conversation) => {
      // If the conversation is the one being read, set it as read
      if (conversation.pnm._id === pnmId) {
        updateConversation({
          ...conversation,
          read: true,
        });
      }
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

  return {
    status,
    searchQuery,
    filterActions,

    isLoading: query.isLoading,
    conversations: filteredConversations,

    refetch,
    setStatus,
    addConversations,
    onFilterPress,
    setSearchQuery,
    setConversationAsRead,
  };
};

export default useConversations;

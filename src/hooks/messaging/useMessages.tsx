/*
 * Created on Sub Oct 9 2023
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
import { useInfiniteQuery } from "@tanstack/react-query";

import { useAuth } from "@/providers/Auth";
import messagingApi from "@/api/api/messaging";
import useConversations from "@/hooks/useConversations";

const useMessages = (pnmId: string) => {
  // Get access token so that we can cache the query
  const { accessToken } = useAuth();
  // Get the setConversationAsRead function from the conversations provider
  const { setConversationAsRead } = useConversations();
  // Create a state to store the messages
  const [messages, setMessages] = useState<Message[]>([]);

  // Create a query to get the organizations messages
  const query = useInfiniteQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["messaging", accessToken, pnmId],
    queryFn: async ({ pageParam = 0 }) => {
      return messagingApi.getMessages({
        limit: 50,
        offset: pageParam,
        pnmId: pnmId || "",
      });
    },
    getNextPageParam: (lastPage) => {
      // If there are no more messages, return undefined
      if (lastPage.data.data.messages.length < 50) return undefined;
      // Otherwise, return the next offset
      return lastPage.data.data.nextOffset;
    },
  });

  useEffect(() => {
    // If a query succeded, set the conversation as read
    if (query.data) {
      setConversationAsRead(pnmId);
    }
  }, [query.data]);

  useEffect(() => {
    // If the query has data, set the messages state
    if (query.data) {
      // Convert the data into a readable format
      const messagesData = query.data.pages.flatMap(
        (page) => page.data.data.messages,
      );
      // Set the conversations state
      setMessages(messagesData);
    }
  }, [query.data, query.data?.pages]);

  const addMessage = (content: string) => {
    // Create a message object
    const message: Message = {
      _id: "temp",
      organization: "temp",
      pnm: pnmId,
      content,
      sent: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add the message to the messages state
    setMessages((messages) => [message, ...messages]);
  };

  return {
    ...query,
    messages,
    addMessage,
  };
};

export default useMessages;

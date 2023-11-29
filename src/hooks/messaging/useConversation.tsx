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

import { useEffect } from "react";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import { useAuth } from "@/providers/Auth";
import messagingApi from "@/api/api/messaging";
import useContactsStore from "@/state/messaging/contacts";
import useMessagesStore from "@/state/messaging/messages";
import useConversationsStore from "@/state/messaging/conversations";

const useConversation = (pnmId: string) => {
  const { accessToken, organization } = useAuth();

  const messages = useMessagesStore((s) => s.getMessages(pnmId));
  const addMessage = useMessagesStore((s) => s.addMessage);
  const setMessages = useMessagesStore((s) => s.setMessages);
  const replaceMessage = useMessagesStore((s) => s.replaceMessage);

  const removeContactFrom = useContactsStore((s) => s.removeContactFrom);

  const conversation = useConversationsStore((s) => s.getConversation(pnmId));
  const addConversations = useConversationsStore((s) => s.addConversations);

  const initialMessages = conversation?.messages || [];

  const messagesQuery = useInfiniteQuery({
    queryKey: ["messaging", accessToken, pnmId],
    queryFn: async ({ pageParam = 0 }) => {
      return messagingApi.getConversation({
        offset: pageParam,
        pnmId: pnmId || "",
      });
    },
    getNextPageParam: (lastPage) => {
      const hasNextPage = lastPage.data.data.hasNextPage;

      if (!hasNextPage) return undefined;

      return lastPage.data.data.nextOffset;
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: (input: SendMessageInput) => {
      return messagingApi.sendMessage(input);
    },
  });

  // On mount, set the messages state to the initial messages
  useEffect(() => {
    setMessages(pnmId, initialMessages);
  }, []);

  // If the query has data, set the messages state
  useEffect(() => {
    if (messagesQuery.data?.pages) {
      handleQueryData(messagesQuery.data.pages);
    }
  }, [messagesQuery.data?.pages]);

  const handleQueryData = (data: GetConversationAPIResponse[]) => {
    if (data) {
      const firstConversation = data[0].data.data.conversation;

      // Flatten the data to get the messages, and filter out any null messages
      const messagesData = data.flatMap((page) => {
        const messages = page.data.data.conversation?.messages || [];
        const filteredMessages = messages.filter(Boolean);
        return filteredMessages;
      });

      // Check if the messagesData is behind (has less messages than the state)
      // If it is, we dont want to set the state to the new data, this is because the
      // "messagesData" is using the cached data, not the new data
      const messagesState = messages || [];
      const messagesDataLength = messagesData.length;
      const messagesStateLength = messagesState.length;

      const isBehind = messagesDataLength < messagesStateLength;

      if (data.length === 1) {
        // Ensure there is a first conversation
        if (firstConversation && !isBehind) {
          addConversations([firstConversation]);
        }
      }

      if (!isBehind) setMessages(pnmId, messagesData);
    }
  };

  const sendMessage = async (content: string) => {
    const payload: SendMessageInput = {
      message: content,
      pnms: [pnmId],
    };

    const message: Message = {
      _id: "temp",
      organization: organization._id,
      pnm: pnmId,
      content,
      sent: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addMessage(pnmId, message);

    try {
      const response = await sendMessageMutation.mutateAsync(payload);
      const conversations = response.data.data.conversations;
      const messages = response.data.data.messages;

      if (conversations.length === 0) {
        throw new Error("No conversations were created");
      }

      if (messages.length === 0) {
        throw new Error("No messages were created");
      }

      addConversations(conversations);
      // We need to replace the temp message, otherwise we cant add a new message
      // because the "temp" id will already exist
      replaceMessage(pnmId, "temp", messages[0]);
      removeContactFrom("uncontactedPnms", pnmId);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    messages,
    isLoading: sendMessageMutation.isLoading || messagesQuery.isLoading,

    sendMessage,
    refetch: messagesQuery.refetch,
    fetchNextPage: messagesQuery.fetchNextPage,
  };
};

export default useConversation;

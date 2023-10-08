/*
 * Created on Wed Oct 4 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";

import { useAuth } from "@/providers/Auth";
import messagingApi from "@/api/api/messaging";
import { useConversations } from "@/providers/Conversations";

const useMessaging = (pnmId?: string) => {
  // Create a navigation state so we can navigate back to the conversations screen
  const navigation = useNavigation();
  // Get access token so that we can cache the query
  const { accessToken, organization } = useAuth();
  // Use the conversations hook
  const { addConversations, setIsSendingMessage } = useConversations();

  // Create a mutation to send a message
  const mutation = useMutation({
    mutationFn: (input: SendMessageInput) => {
      return messagingApi.sendMessage(input);
    },
  });

  // Create a query to get the organizations messages
  const query = useInfiniteQuery({
    // Use access token as the query key so response is cached on a per-user basis
    queryKey: ["messaging", accessToken, pnmId],
    enabled: !!pnmId,
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

  // Get the messages from the query
  const messagesData = query.data?.pages.flatMap(
    (page) => page.data.data.messages,
  );
  // Create a state to store the messages, so we can update them
  const [messages, setMessages] = useState(messagesData || []);

  const sendMessage = async (input: SendMessageInput) => {
    setIsSendingMessage(true);
    // Create a temporary message so we can update the UI, this
    // will be replaced by the actual message when the mutation
    // is successful
    if (input.pnms.length == 1) {
      let temporaryMessage: Message = {
        pnm: input.pnms[0],
        content: input.message,
        organization: organization._id,
        sent: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      setMessages((messages) => [temporaryMessage, ...messages]);
    }

    // If the message was sent to multiple PNMs, navigate to the messages screen
    if (input.pnms.length > 1) {
      (navigation.navigate as any)("Messages");
    }

    // Attempt to send the message
    let response;

    try {
      response = await mutation.mutateAsync(input);
    } catch (error) {
      // TODO: Handle error, add a "failed" state to all messages or smth
      setIsSendingMessage(false);
      return;
    }

    // Destrucure the conversations from the response
    let conversations = response.data.data.conversations;

    // Add the conversations to the conversations state
    addConversations(conversations);
    // Set the message loading state to false
    setIsSendingMessage(false);
  };

  return {
    ...query,
    messages,
    sendMessage,
  };
};

export default useMessaging;

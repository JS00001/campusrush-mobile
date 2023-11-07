/*
 * Created on Sun Oct 9 2023
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
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

import errors from "@/lib/errors";
import messagingApi from "@/api/api/messaging";
import useConversations from "@/hooks/useConversations";
import { ConversationStatus } from "@/state/conversations";

const useMessageSender = (_pnms: PNM[]) => {
  // Create a navigation state so we can navigate back to the conversations screen
  const navigation = useNavigation();

  // Create state to store the pnmIds
  const [pnms, setPnms] = useState(_pnms);

  // Use the conversations hook to add conversations to the state variable
  const { setStatus, addConversations } = useConversations();

  // Create a mutation to send a message
  const mutation = useMutation({
    mutationFn: (input: SendMessageInput) => {
      return messagingApi.sendMessage(input);
    },
  });

  // Remove a PNM from the list when they are removed.
  const onPnmRemove = (pnm: PNM) => {
    // Remove the pnm from the state variable
    setPnms((prevPnms) =>
      prevPnms.filter((prevPnm) => prevPnm._id !== pnm._id),
    );
  };

  const sendMessage = async (content: string) => {
    // Create an input object to send to the mutation
    let input: SendMessageInput = {
      message: content,
      pnms: pnms.map((pnm) => pnm._id),
    };

    // If the message was sent to multiple PNMs, navigate to the messages screen
    // and set the conversation status to "sending"
    if (input.pnms.length > 1) {
      // Navigate to the messages screen
      (navigation.navigate as any)("Messages");
      // Set the conversation status to "sending"
      setStatus(ConversationStatus.Sending);
    }

    // Attempt to send the message
    let response;

    try {
      response = await mutation.mutateAsync(input);
    } catch (error) {
      errors.handleApiError(error);
      setStatus(ConversationStatus.Failed);
    }

    // If there was an error, prevent the "success" code from running
    if (!response) return;

    // Destrucure the conversations from the response
    let conversations = response.data.data.conversations;

    // Add the conversations to the conversations state
    addConversations(conversations);

    // If the message was sent to multiple PNMs, set the conversation status to "sent"
    if (input.pnms.length > 1) {
      setStatus(ConversationStatus.Sent);
      return;
    }
  };

  return {
    ...mutation,
    pnms,
    sendMessage,
    onPnmRemove,
  };
};

export default useMessageSender;

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

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

import errors from "@/lib/errors";
import messagingApi from "@/apiv1/api/messaging";
import useContactsStore from "@/statev1/messaging/contacts";
import useMessagesStore from "@/statev1/messaging/messages";
import useConversationsStore from "@/statev1/messaging/conversations";
import { ConversationStatus } from "@/statev1/messaging/conversations";
const useMassMessager = (pnms: PNM[]) => {
  const navigation = useNavigation();

  const [filteredPnms, setFilteredPnms] = useState(pnms);

  // Accessing state management functions from local stores
  const setStatus = useConversationsStore((s) => s.setStatus);
  const addConversations = useConversationsStore((s) => s.addConversations);
  const removeContactsFrom = useContactsStore((s) => s.removeContactsFrom);

  const addMessages = useMessagesStore((s) => s.addMessage);

  const sendMessageMutation = useMutation({
    mutationFn: (input: SendMassMessageInput) => {
      return messagingApi.sendMassMessage(input);
    },
  });

  // Remove a PNM from the list of recipients
  const removePnm = (pnm: PNM) => {
    setFilteredPnms((prevPnms) => {
      return prevPnms.filter((prevPnm) => prevPnm._id !== pnm._id);
    });
  };

  // Send a message to the PNMs in the list
  const sendMessage = async (content: string) => {
    const payload: SendMassMessageInput = {
      message: content,
      pnms: filteredPnms.map((pnm) => pnm._id),
    };

    (navigation.navigate as any)("Messages");
    setStatus(ConversationStatus.Sending);

    try {
      const response = await sendMessageMutation.mutateAsync(payload);

      if (!response) {
        return setStatus(ConversationStatus.Idle);
      }

      const conversations = response?.data.data.conversations;
      const messages = response?.data.data.messages;

      if (conversations.length === 0) {
        throw new Error("No conversations were created");
      }

      if (messages.length === 0) {
        throw new Error("No messages were created");
      }

      // Reverse the order of the conversations to be in chronological order
      conversations.reverse();

      addConversations(conversations);
      setStatus(ConversationStatus.Sent);
      removeContactsFrom("uncontactedPnms", payload.pnms);

      messages.forEach((message) => {
        addMessages(message.pnm, message);
      });
    } catch (error) {
      errors.handleApiError(error);
    }
  };

  return {
    ...sendMessageMutation,
    pnms: filteredPnms,
    removePnm,
    sendMessage,
  };
};

export default useMassMessager;

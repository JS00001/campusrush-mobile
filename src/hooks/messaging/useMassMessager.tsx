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
import messagingApi from "@/api/api/messaging";
import useContactsStore from "@/state/messaging/contacts";
import useConversationsStore from "@/state/messaging/conversations";
import { ConversationStatus } from "@/state/messaging/conversations";

const useMassMessager = (pnms: PNM[]) => {
  const navigation = useNavigation();

  const [filteredPnms, setFilteredPnms] = useState(pnms);

  // Accessing state management functions from local stores
  const setStatus = useConversationsStore((s) => s.setStatus);
  const addConversations = useConversationsStore((s) => s.addConversations);
  const removeContactsFrom = useContactsStore((s) => s.removeContactsFrom);

  const sendMessageMutation = useMutation({
    mutationFn: (input: SendMessageInput) => {
      return messagingApi.sendMessage(input);
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
    const payload: SendMessageInput = {
      message: content,
      pnms: filteredPnms.map((pnm) => pnm._id),
    };

    (navigation.navigate as any)("Messages");
    setStatus(ConversationStatus.Sending);

    try {
      const response = await sendMessageMutation.mutateAsync(payload);
      const conversations = response.data.data.conversations;

      if (conversations.length === 0) {
        throw new Error("No conversations were created");
      }

      // Reverse the order of the conversations to be in chronological order
      conversations.reverse();

      addConversations(conversations);
      setStatus(ConversationStatus.Sent);
      removeContactsFrom("uncontactedPnms", payload.pnms);
    } catch (error) {
      errors.handleApiError(error);
      setStatus(ConversationStatus.Failed);
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

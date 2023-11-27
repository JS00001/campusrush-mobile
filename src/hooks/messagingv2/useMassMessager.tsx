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
import useContactsStore from "@/state/contacts";
import useConversationsStore from "@/state/conversations";
import { ConversationStatus } from "@/state/conversations";

const useMassMessager = (pnms: PNM[]) => {
  const navigation = useNavigation();

  const [filteredPnms, setFilteredPnms] = useState(pnms);

  // Accessing state management functions from local stores
  const setStatus = useConversationsStore((s) => s.setStatus);
  const addConversations = useConversationsStore((s) => s.addConversations);
  const removeContactsFrom = useContactsStore((s) => s.removeContactsFrom);

  // We only allow the removal of PNMs if there are more than 2, otherwise its not a mass message
  const allowPnmRemoval = filteredPnms.length > 2;

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

      setStatus(ConversationStatus.Sent);
      addConversations(conversations);
      removeContactsFrom("uncontactedPnms", pnms);
    } catch (error) {
      errors.handleApiError(error);
      setStatus(ConversationStatus.Failed);
    }
  };

  return {
    ...sendMessageMutation,
    allowPnmRemoval,
    pnms: filteredPnms,
    removePnm,
    sendMessage,
  };
};

export default useMassMessager;

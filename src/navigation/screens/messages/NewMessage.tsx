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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useContactStore, useMessageStore } from "@/store";
import { useSendMassMessage } from "@/hooks/api/messaging";
import { useConversationStore } from "@/store/messaging/ConversationStore";

import Layout from "@/ui/Layout";
import MessageBox from "@/components/MessageBox";
import ChatHeader from "@/components/Headers/Chat";

interface NewMessageProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const NewMessage: React.FC<NewMessageProps> = ({ navigation, route }) => {
  const initialPnms: PNM[] = route.params.pnms;

  const [pnms, setPnms] = useState(initialPnms);

  const contactStore = useContactStore();
  const messageStore = useMessageStore();
  const conversationStore = useConversationStore();
  const sendMassMessageMutation = useSendMassMessage();

  const onMessageSend = async (message: string) => {
    const payload = {
      message,
      pnms: pnms.map((pnm) => pnm._id),
    };

    (navigation.navigate as any)("Messages");

    // TODO: Before we begin the mutation, we want to set the loading state somehow on the messgages screen

    const res = await sendMassMessageMutation.mutateAsync(payload);

    if ("error" in res) return;

    const messages = res.data.messages;
    const conversations = res.data.conversations;

    /**
     * The API will return the conversations in a 'backwards' order so we need to reverse
     * them to get them in chronological order
     */
    conversations.reverse();

    conversationStore.addConversations(conversations);
    // TODO: Now, set the status of the message to sent
    contactStore.removeContacts("uncontacted", pnms);

    messages.forEach((message) => {
      messageStore.addMessages(message.pnm, message);
    });
  };

  const onRemovePnm = (pnm: PNM) => {
    setPnms((prev) => prev.filter((p) => p._id !== pnm._id));
  };

  return (
    <Layout scrollable gap={8}>
      <Layout.CustomHeader>
        <ChatHeader pnms={pnms} onPnmRemove={onRemovePnm} />
      </Layout.CustomHeader>

      <Layout.Footer keyboardAvoiding>
        <MessageBox onSend={onMessageSend} />
      </Layout.Footer>
    </Layout>
  );
};

export default NewMessage;

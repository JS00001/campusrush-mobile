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

import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Layout } from "@/ui/Layout";
import MessageBox from "@/components/MessageBox";
import MessageList from "@/components/MessageList";

import {
  useGetConversation,
  useSendDirectMessage,
} from "@/hooks/api/messaging";
import {
  useContactStore,
  useMessageStore,
  useConversationStore,
} from "@/store";
import SocketInput from "@/lib/socketInput";
import { useAuth } from "@/providers/Auth";
import { useWebsocket } from "@/providers/Websocket";
import DirectMessageHeader from "@/components/Headers/DirectMessage";

interface ChatProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const Chat: React.FC<ChatProps> = ({ route }) => {
  const pnm = route.params.pnm as PNM;
  const pnmId = pnm._id;

  const { ws } = useWebsocket();
  const { chapter } = useAuth();

  const contactStore = useContactStore();
  const messageStore = useMessageStore();
  const conversationStore = useConversationStore();

  const sendMessageMutation = useSendDirectMessage();
  const conversationQuery = useGetConversation(pnmId);

  const messages = messageStore.getMessages(pnmId) || [];
  const conversation = conversationStore.getConversation(pnmId);

  /**
   * On the first render, set the conversation as opened
   * in the websocket
   */
  useEffect(() => {
    const message = new SocketInput({
      type: "READ_CONVERSATION",
      data: { id: pnmId },
    });

    ws?.send(message.toString());

    if (!conversation) return;

    conversationStore.updateConversation({ ...conversation, read: true });

    return () => {};
  }, []);

  /**
   * On the first render, we want the initial message data
   * to be 'fetched' from the conversation and added to the
   * message store
   */
  useEffect(() => {
    messageStore.setMessages(pnmId, conversation?.messages || []);
  }, []);

  /**
   * Whenever the conversation query is updated/new pages are
   * fetched, we need to update the conversation and message store
   */
  useEffect(() => {
    if (!conversationQuery.data) return;

    const fetchedConversation = (conversationQuery.data.pages[0] as any).data
      .conversation;

    const fetchedMessages = conversationQuery.data.pages.flatMap((page) => {
      if ("error" in page) return [];

      const messages = page.data.conversation?.messages || [];
      const filteredMessages = messages.filter(Boolean);
      return filteredMessages;
    });

    const storedMessages = messageStore.getMessages(pnmId) || [];
    const storedMessagesLength = storedMessages.length;
    const fetchedMessagesLength = fetchedMessages.length;

    const isQueryBehind = fetchedMessagesLength < storedMessagesLength;

    if (conversationQuery.data.pages.length === 1) {
      if (fetchedConversation && !isQueryBehind) {
        conversationStore.updateConversation(fetchedConversation);
      }
    }

    if (!isQueryBehind) {
      messageStore.setMessages(pnmId, fetchedMessages);
    }
  }, [conversationQuery.data]);

  /**
   * Send a direct message
   */
  const sendDirectMessage = async (message: string) => {
    const payload = {
      message,
      pnm: pnmId,
    };

    const newMessage: Message = {
      _id: "temp",
      sent: true,
      pnm: pnmId,
      content: message,
      chapter: chapter._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    messageStore.addMessages(pnmId, newMessage);

    const res = await sendMessageMutation.mutateAsync(payload);

    if ("error" in res) return messageStore.removeMessage(pnmId, "temp");

    conversationStore.addConversations(res.data.conversation);
    messageStore.replaceMessage(pnmId, "temp", res.data.message);
    contactStore.removeContacts("uncontacted", pnm);
  };

  const onEndReached = async () => {
    await conversationQuery.fetchNextPage();
  };

  const onSend = async (message: string) => {
    await sendDirectMessage(message);
  };

  return (
    <Layout.Root>
      <Layout.CustomHeader>
        <DirectMessageHeader
          pnm={pnm}
          loading={sendMessageMutation.isLoading}
        />
      </Layout.CustomHeader>

      <Layout.Content gap={8} removePadding>
        <MessageList
          messages={messages}
          onEndReached={onEndReached}
          onStartReached={async () => {}}
        />
      </Layout.Content>

      <Layout.Footer keyboardAvoiding>
        <MessageBox
          onSend={onSend}
          disableSend={sendMessageMutation.isLoading}
        />
      </Layout.Footer>
    </Layout.Root>
  );
};

export default Chat;

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
import { Keyboard } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Layout } from "@/ui/Layout";
import MessageBox from "@/components/MessageBox";

import {
  useGetConversation,
  useSendDirectMessage,
} from "@/hooks/api/messaging";
import {
  useContactStore,
  useMessageStore,
  useConversationStore,
} from "@/store";
import tw from "@/lib/tailwind";
import FlatList from "@/ui/FlatList";
import messaging from "@/lib/messages";
import { useAuth } from "@/providers/Auth";
import SocketInput from "@/lib/socketInput";
import MessageBubble from "@/ui/MessageBubble";
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

  const conversation = conversationStore.getConversation(pnmId);
  const messages =
    messageStore.getMessages(pnmId) || conversation?.messages || [];

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
   * Send direct messages to the server and update the message store
   */
  const sendDirectMessages = async (messages: string[]) => {
    // First, add ALL messages to the message store (so the UI gets updated immediately
    // with ALL of the messages, even if they haven't been sent yet)
    for (let i = 0; i < messages.length; i++) {
      if (!messages[i].length) return;

      const messageId = `temp-${i}`;

      const newMessage: Message = {
        _id: messageId,
        sent: true,
        pnm: pnmId,
        content: messages[i],
        chapter: chapter._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      messageStore.addMessages(pnmId, newMessage);
    }

    // Then, send each message to the server, and replace it in the message store
    // as the requests complete
    for (let i = 0; i < messages.length; i++) {
      const messageId = `temp-${i}`;

      const payload = {
        message: messages[i],
        pnm: pnmId,
      };

      const res = await sendMessageMutation.mutateAsync(payload);

      if ("error" in res) return messageStore.removeMessage(pnmId, messageId);

      conversationStore.addConversations(res.data.conversation);
      messageStore.replaceMessage(pnmId, messageId, res.data.message);
      contactStore.removeContacts("uncontacted", pnm);
    }
  };

  /**
   * When the user begins scrolling, we want to close the message box
   * or dismiss the keyboard
   */
  const onMomentumScrollBegin = () => {
    Keyboard.dismiss();
  };

  /**
   * When the user reaches the end of the list, we want to fetch more
   * messages
   */
  const onEndReached = async () => {
    await conversationQuery.fetchNextPage();
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
        <FlatList
          inverted
          disableOnRefresh
          disableOnEndReached={!conversationQuery.hasNextPage}
          data={messaging.groupByDate(messages ?? [])}
          style={tw`w-full px-4`}
          // We need to add "padding top" because the flatlist is inverted
          contentContainerStyle={tw`pt-6 pb-0`}
          ListEmptyComponent={<></>}
          onEndReached={onEndReached}
          onMomentumScrollBegin={onMomentumScrollBegin}
          renderItem={({ item }) => (
            <MessageBubble
              key={item._id}
              content={item.content}
              sent={item.sent}
              date={item.showDate ? item.date : undefined}
              createdAt={
                item.showTimestamp ? item.createdAt.toString() : undefined
              }
            />
          )}
        />
      </Layout.Content>

      <Layout.Footer keyboardAvoiding>
        <MessageBox
          onSend={sendDirectMessages}
          disableSend={sendMessageMutation.isLoading}
        />
      </Layout.Footer>
    </Layout.Root>
  );
};

export default Chat;

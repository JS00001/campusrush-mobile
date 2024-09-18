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

import type { IMessageContent } from "@/types/messageBox";
import type { IMessage, SendDirectMessageRequest } from "@/types";
import type { ConversationStackProps } from "@/navigation/@types";

import {
  useContactStore,
  useMessageStore,
  useConversationStore,
} from "@/store";
import tw from "@/lib/tailwind";
import { Layout } from "@/ui/Layout";
import FlatList from "@/ui/FlatList";
import group from "@/lib/util/group";
import { useAuth } from "@/providers/Auth";
import SocketInput from "@/lib/socketInput";
import usePosthog from "@/hooks/usePosthog";
import MessageBubble from "@/ui/MessageBubble";
import MessageBox from "@/components/MessageBox";
import useFocusEffect from "@/hooks/useFocusEffect";
import { useWebsocket } from "@/providers/websocket";
import { useSendDirectMessage } from "@/hooks/api/messaging";
import { useGetConversation } from "@/hooks/api/conversations";
import DirectMessageHeader from "@/components/Headers/DirectMessage";

type Props = ConversationStackProps<"Chat">;

const Chat: React.FC<Props> = ({ route }) => {
  const pnm = route.params.pnm;
  const pnmId = pnm._id;

  const posthog = usePosthog();
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
   * in the websocket. Then, if the conversation becomes unread while
   * the conversation is open, we want to re-set the conversation as read
   * as we are currently viewing it
   */
  useFocusEffect(() => {
    if (!conversation) return;
    if (conversation.read) return;

    const message = new SocketInput({
      type: "READ_CONVERSATION",
      data: { id: pnmId },
    });

    ws?.send(message.toString());
    conversationStore.updateConversation({ ...conversation, read: true });
  }, [conversation]);

  /**
   * Whenever the conversation query is updated/new pages are
   * fetched, we need to update the conversation and message store
   */
  useEffect(() => {
    if (!conversationQuery.data) return;
    if (conversationQuery.isLoading) return;

    const fetchedConversation = (conversationQuery.data.pages[0] as any).data
      .conversation;

    if (!fetchedConversation) return;

    // All of the messages that have been fetched in the conversation query are
    // combined into one array
    const fetchedMessages = conversationQuery.data.pages.flatMap((page) => {
      if ("error" in page) return [];

      const messages = page.data.conversation?.messages || [];
      const filteredMessages = messages.filter(Boolean);

      return filteredMessages;
    });

    conversationStore.updateConversation(fetchedConversation);
    messageStore.setMessages(pnmId, fetchedMessages);
  }, [conversationQuery.data]);

  /**
   * Send direct messages to the server and update the message store
   */
  const sendDirectMessages = async (messages: IMessageContent[]) => {
    // First, add ALL messages to the message store (so the UI gets updated immediately
    // with ALL of the messages, even if they haven't been sent yet)
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      if (!message.content?.length && !message.attachments.length) continue;

      const messageId = `temp-${i}`;
      const newMessage: IMessage = {
        _id: messageId,
        sent: true,
        pnm: pnmId,
        content: message.content,
        attachments: message.attachments,
        chapter: chapter._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      messageStore.addMessages(newMessage);
    }

    // Then, send each message to the server, and replace it in the message store
    // as the requests complete
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      const messageId = `temp-${i}`;

      const payload: SendDirectMessageRequest = {
        message: message.content,
        attachments: message.attachments,
        pnm: pnmId,
      };

      const res = await sendMessageMutation.mutateAsync(payload).catch(() => {
        messageStore.removeMessage(pnmId, messageId);
      });

      if (!res) continue;

      // TODO: Performance bottleneck - Takes 1453.159ms to update all of this state
      conversationStore.addConversations(res.data.conversation);
      messageStore.replaceMessage(pnmId, messageId, res.data.message);
      contactStore.removeContacts("uncontacted", pnm);
    }

    posthog.capture("DIRECT_MESSAGE_SENT", { count: messages.length });
    return { cancelled: false };
  };

  /**
   * When the user begins scrolling, we want to close the message box
   * or dismiss the keyboard
   */
  const onScrollBeginDrag = () => {
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
        <DirectMessageHeader pnmId={pnmId} />
      </Layout.CustomHeader>

      <FlatList
        inverted
        disableOnRefresh
        disableOnEndReached={!conversationQuery.hasNextPage}
        data={group.byDate<IMessage>(messages ?? [], "createdAt", true)}
        style={tw`w-full px-4`}
        // We need to add "padding top" because the flatlist is inverted
        contentContainerStyle={tw`pt-6 pb-0`}
        ListEmptyComponent={<></>}
        onEndReached={onEndReached}
        onScrollBeginDrag={onScrollBeginDrag}
        renderItem={({ item }) => (
          <MessageBubble key={item._id} message={item} />
        )}
      />

      <Layout.Footer>
        <MessageBox
          massMessage={false}
          onSend={sendDirectMessages}
          disableSend={sendMessageMutation.isLoading}
        />
      </Layout.Footer>
    </Layout.Root>
  );
};

export default Chat;

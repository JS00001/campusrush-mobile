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

import { Keyboard } from "react-native";

import type { IMessageContent } from "@/@types/message-box";
import type { IMessage, SendDirectMessageRequest } from "@/types";
import type { ConversationStackProps } from "@/navigation/@types";

import tw from "@/lib/tailwind";
import { Layout } from "@/ui/Layout";
import FlatList from "@/ui/FlatList";
import group from "@/lib/util/group";
import SocketInput from "@/lib/socketInput";
import queryClient from "@/lib/query-client";
import MessageBubble from "@/ui/MessageBubble";
import MessageBox from "@/components/MessageBox";
import useFocusEffect from "@/hooks/useFocusEffect";
import { useWebsocket } from "@/providers/Websocket";
import { useSendDirectMessage } from "@/hooks/api/messaging";
import { useGetConversation } from "@/hooks/api/conversations";
import DirectMessageHeader from "@/components/Headers/DirectMessage";

type Props = ConversationStackProps<"Chat">;

const Chat: React.FC<Props> = ({ route }) => {
  const pnm = route.params.pnm;
  const pnmId = pnm._id;

  const { ws } = useWebsocket();
  const sendMessageMutation = useSendDirectMessage();
  const conversationQuery = useGetConversation(pnmId);

  const messages = conversationQuery.messages;

  // PR_TODO: Loading and Error State
  if (conversationQuery.isLoading) return null;
  if (conversationQuery.isError) return null;

  /**
   * On the first render, set the conversation as opened
   * in the websocket. Then, if the conversation becomes unread while
   * the conversation is open, we want to re-set the conversation as read
   * as we are currently viewing it
   */
  useFocusEffect(() => {
    const conversation = conversationQuery.conversation;

    if (!conversation) return;
    if (conversation.read) return;

    const message = new SocketInput({
      type: "READ_CONVERSATION",
      data: { id: pnmId },
    });

    ws?.send(message.toString());
    queryClient.readConversation(pnmId);
  }, [conversationQuery.conversation]);

  /**
   * Send direct messages to the server and update the message store
   */
  const sendDirectMessages = async (messages: IMessageContent[]) => {
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      const payload: SendDirectMessageRequest = {
        message: message.content,
        attachments: message.attachments,
        pnm: pnmId,
      };

      await sendMessageMutation.mutateAsync(payload);
    }

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
          disableSend={sendMessageMutation.isPending}
        />
      </Layout.Footer>
    </Layout.Root>
  );
};

export default Chat;

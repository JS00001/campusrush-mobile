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

import Layout from "@/ui/Layout";
import MessageBox from "@/components/MessageBox";
import MessageList from "@/components/MessageList";
import ChatHeader from "@/components/Headers/Chat";
import { useWebsocket } from "@/providers/Websocket";
import useConversation from "@/hooks/messaging/useConversation";

interface ChatProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const Chat: React.FC<ChatProps> = ({ route, navigation }) => {
  // Get the pnm from the route params
  const pnm = route.params.pnm;

  const { onConversationOpen, onConversationClose } = useWebsocket();

  const { isLoading, messages, fetchNextPage, sendMessage } = useConversation(
    pnm._id,
  );

  // Ensure that the pnm is defined, otherwise go back
  if (!pnm) navigation.goBack();

  // When the user reaches the end of the list, fetch the next page
  const onEndReached = async () => {
    await fetchNextPage();
  };

  // Send a message
  const onSend = async (text: string) => {
    await sendMessage(text);
  };

  // When the component mounts, open the conversation
  useEffect(() => {
    onConversationOpen(pnm._id);

    return () => {
      onConversationClose();
    };
  }, []);

  return (
    <>
      <Layout gap={8}>
        <Layout.CustomHeader>
          <ChatHeader pnms={[route.params.pnm]} loading={isLoading} />
        </Layout.CustomHeader>

        <MessageList
          messages={messages}
          onEndReached={onEndReached}
          onStartReached={async () => {}}
        />

        <Layout.Footer keyboardAvoiding>
          <MessageBox onSend={onSend} disableSend={isLoading} />
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default Chat;

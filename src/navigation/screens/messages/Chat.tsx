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

import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Layout from "@/ui/Layout";
import ProgressBar from "@/ui/ProgressBar";
import MessageBox from "@/components/MessageBox";
import MessageList from "@/components/MessageList";
import useMessages from "@/hooks/messaging/useMessages";
import useMessageSender from "@/hooks/messaging/useMessageSender";

interface ChatProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const Chat: React.FC<ChatProps> = ({ route, navigation }) => {
  // Get the pnm from the route params
  const pnm = route.params.pnm;

  // Get the method to send a message
  const { sendMessage, isLoading } = useMessageSender([pnm]);
  // Get the messages from the pnm, and the methods to update them
  const { messages, fetchNextPage, refetch, addMessage } = useMessages(pnm._id);

  // Ensure that the pnm is defined, otherwise go back
  if (!pnm) navigation.goBack();

  // When the user reaches the end of the list, fetch the next page
  const onEndReached = async () => {
    await fetchNextPage();
  };

  const onStartReached = async () => {};

  const onSend = async (text: string) => {
    addMessage(text);
    await sendMessage(text);
    await refetch();
  };

  return (
    <>
      <Layout gap={8}>
        <Layout.ChatHeader pnms={[route.params.pnm]} />

        <MessageList
          messages={messages}
          onEndReached={onEndReached}
          onStartReached={onStartReached}
        />

        <Layout.Footer keyboardAvoiding>
          <ProgressBar loading={isLoading} />
          <MessageBox onSend={onSend} />
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default Chat;

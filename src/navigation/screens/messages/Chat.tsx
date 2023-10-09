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
import useMessages from "@/hooks/messaging/useMessages";
import Message from "@/ui/Message";
import MessageBox from "@/components/MessageBox";

interface ChatProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const Chat: React.FC<ChatProps> = ({ route, navigation }) => {
  const pnm = route.params.pnm;

  const { messages, isLoading } = useMessages(pnm._id);

  // Ensure that the pnm is defined, otherwise go back
  if (!pnm) navigation.goBack();

  return (
    <>
      <Layout scrollable gap={8}>
        <Layout.ChatHeader pnms={[route.params.pnm]} />

        {messages?.map((message) => (
          <Message
            key={message._id}
            content={message.content}
            sent={message.sent}
            // createdAt={message.createdAt.toString()}
          />
        ))}

        <Layout.Footer keyboardAvoiding>
          <MessageBox onSend={() => {}} />
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default Chat;

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
import MessageBox from "@/components/MessageBox";
import MessageList from "@/components/MessageList";
import useMessages from "@/hooks/messaging/useMessages";

interface ChatProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const Chat: React.FC<ChatProps> = ({ route, navigation }) => {
  // Get the pnm from the route params
  const pnm = route.params.pnm;

  const { messages, isLoading, fetchNextPage, refetch } = useMessages(pnm._id);

  // Ensure that the pnm is defined, otherwise go back
  if (!pnm) navigation.goBack();

  const onEndReached = async () => {
    await fetchNextPage();
  };

  const onStartReached = async () => {
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
          <MessageBox onSend={() => {}} />
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default Chat;

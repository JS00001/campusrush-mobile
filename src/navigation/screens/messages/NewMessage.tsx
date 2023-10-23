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
import ChatHeader from "@/components/ChatHeader";
import MessageBox from "@/components/MessageBox";
import useMessageSender from "@/hooks/messaging/useMessageSender";

interface NewMessageProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const NewMessage: React.FC<NewMessageProps> = ({ route }) => {
  // Define the pnms from the route params
  const routePnms = route.params.pnms;

  // Import the functions needed to send messages and manage the PNMS that messages
  // are being sent to
  const { pnms, sendMessage, onPnmRemove } = useMessageSender(routePnms);

  return (
    <>
      <Layout scrollable gap={8}>
        <Layout.CustomHeader>
          <ChatHeader pnms={pnms} onPnmRemove={onPnmRemove} />
        </Layout.CustomHeader>

        <Layout.Footer keyboardAvoiding>
          <MessageBox onSend={sendMessage} />
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default NewMessage;

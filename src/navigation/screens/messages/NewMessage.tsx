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
import useMassMessager from "@/hooks/messaging/useMassMessager";

interface NewMessageProps {
  route: any;
  navigation: NativeStackNavigationProp<any>;
}

const NewMessage: React.FC<NewMessageProps> = ({ navigation, route }) => {
  // Define the pnms from the route params
  const routePnms = route.params.pnms;

  const { pnms, sendMessage, removePnm } = useMassMessager(routePnms);

  return (
    <>
      <Layout scrollable gap={8}>
        <Layout.CustomHeader>
          <ChatHeader pnms={pnms} onPnmRemove={removePnm} />
        </Layout.CustomHeader>

        <Layout.Footer keyboardAvoiding>
          <MessageBox onSend={sendMessage} />
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default NewMessage;

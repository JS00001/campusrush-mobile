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
import { useState } from "react";
import MessageBox from "@/components/MessageBox";
import useMessaging from "@/hooks/messaging/useMessaging";

interface NewMessageProps {
  navigation: NativeStackNavigationProp<any>;
  route: any;
}

const NewMessage: React.FC<NewMessageProps> = ({ route }) => {
  // Create a state variable to hold the pnms from the route params
  const [pnms, setPnms] = useState<PNM[]>(route.params.pnms);
  // Use the messaging hook to send messages
  const { sendMessage } = useMessaging();

  const pnmIds = pnms.map((pnm) => pnm._id);

  const onPnmRemove = (pnm: PNM) => {
    // Remove the pnm from the state variable
    setPnms((prevPnms) =>
      prevPnms.filter((prevPnm) => prevPnm._id !== pnm._id),
    );
  };

  const onSend = (message: string) => {
    // Send the message
    sendMessage({ message, pnms: pnmIds });
  };

  return (
    <>
      <Layout scrollable gap={8}>
        <Layout.ChatHeader pnms={pnms} onPnmRemove={onPnmRemove} />

        <Layout.Footer keyboardAvoiding>
          <MessageBox onSend={onSend} />
        </Layout.Footer>
      </Layout>
    </>
  );
};

export default NewMessage;

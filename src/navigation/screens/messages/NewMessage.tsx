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

import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  useContactStore,
  useMessageStore,
  useConversationStore,
  useStatusStore,
} from "@/store";
import { useSendMassMessage } from "@/hooks/api/messaging";

import { Layout } from "@/ui/Layout";
import MessageBox from "@/components/MessageBox";
import { NavigationProp } from "@/navigation/@types";
import MassMessageHeader from "@/components/Headers/MassMessage";

type Props = NavigationProp<"MessagesTab", "NewMessage">;

const NewMessage: React.FC<Props> = ({ navigation, route }) => {
  const initialPnms = route.params.pnms;

  const [pnms, setPnms] = useState(initialPnms);

  const contactStore = useContactStore();
  const messageStore = useMessageStore();
  const conversationStore = useConversationStore();
  const sendMassMessageMutation = useSendMassMessage();
  const setStatus = useStatusStore((s) => s.setStatus);

  const onMessageSend = async (messages: string[]) => {
    navigation.navigate("Messages");

    setStatus("loading");

    for (const message of messages) {
      const payload = {
        message,
        pnms: pnms.map((pnm) => pnm._id),
      };

      const res = await sendMassMessageMutation.mutateAsync(payload);

      if ("error" in res) return setStatus("idle");

      const messages = res.data.messages;
      const conversations = res.data.conversations;

      /**
       * The API will return the conversations in a 'backwards' order so we need to reverse
       * them to get them in chronological order
       */
      conversations.reverse();

      conversationStore.addConversations(conversations);
      contactStore.removeContacts("uncontacted", pnms);

      messageStore.addMessages(messages);
    }

    Toast.show({
      type: "success",
      text1: "Mass message sent",
      text2: `Your message has been sent to ${pnms.length} PNMs.`,
    });

    setStatus("idle");
  };

  const onRemovePnm = (pnm: PNM) => {
    setPnms((prev) => prev.filter((p) => p._id !== pnm._id));
  };

  return (
    <Layout.Root>
      <Layout.CustomHeader>
        <MassMessageHeader pnms={pnms} onPnmRemove={onRemovePnm} />
      </Layout.CustomHeader>

      <Layout.Content>
        <View />
      </Layout.Content>

      <Layout.Footer keyboardAvoiding>
        <MessageBox onSend={onMessageSend} />
      </Layout.Footer>
    </Layout.Root>
  );
};

export default NewMessage;

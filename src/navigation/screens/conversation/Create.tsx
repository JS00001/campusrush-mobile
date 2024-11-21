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

import type { IMessageContent } from "@/@types/message-box";
import type { IPNM, SendMassMessageRequest } from "@/types";
import type { ConversationStackProps } from "@/navigation/@types";

import { alert } from "@/lib/util";
import { Layout } from "@/ui/Layout";
import { useStatusStore } from "@/store";
import usePosthog from "@/hooks/usePosthog";
import MessageBox from "@/components/MessageBox";
import { useSendMassMessage } from "@/hooks/api/messaging";
import MassMessageHeader from "@/components/Headers/MassMessage";

type Props = ConversationStackProps<"Create">;

const Create: React.FC<Props> = ({ navigation, route }) => {
  const initialPnms = route.params.pnms;

  const posthog = usePosthog();
  const sendMassMessageMutation = useSendMassMessage();
  const setStatusOverlay = useStatusStore((s) => s.setStatusOverlay);

  const [pnms, setPnms] = useState(initialPnms);

  /**
   * Verify that the user wants to send a mass message, then
   * proceed to send the message to the selected PNMs
   * Returns whether the user cancelled the message send or not
   */
  const onMessageSend = async (messages: IMessageContent[]) => {
    const PNM_ALERT_THRESHOLD = 24;

    if (pnms.length >= PNM_ALERT_THRESHOLD) {
      const timeToSend = Math.ceil(pnms.length / 6);

      const pressedButtonId = await alert({
        title: "Send Message?",
        message: `Cell providers limit messages to 6 /min. Sending this message will take about ${timeToSend} minutes. You can still use the app while sending, and new messages will be queued. Send mass message?`,
        buttons: [
          { id: "cancel", text: "Cancel", style: "cancel" },
          { id: "send", text: "Send" },
        ],
      });

      if (pressedButtonId === "cancel") {
        posthog.capture("mass_message_cancelled", { pnmCount: pnms.length });
        return { cancelled: true };
      }

      sendMessages(messages);
      return { cancelled: false };
    }

    sendMessages(messages);
    return { cancelled: false };
  };

  /**
   * Send messages to the selected PNMs for the mass
   * message feature
   */
  const sendMessages = async (messages: IMessageContent[]) => {
    navigation.goBack();

    setStatusOverlay("loading");

    for (const message of messages) {
      if (!message.content?.length && !message.attachments.length) continue;

      const payload: SendMassMessageRequest = {
        message: message.content,
        attachments: message.attachments,
        pnms: pnms.map((pnm) => pnm._id),
      };

      await sendMassMessageMutation.mutateAsync(payload).catch(() => {
        setStatusOverlay("idle");
      });
    }

    Toast.show({
      type: "success",
      text1: "Mass message sent",
      text2: `Your message has been sent to ${pnms.length} PNMs.`,
    });

    setStatusOverlay("idle");
  };

  const onRemovePnm = (pnm: IPNM) => {
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

      <Layout.Footer>
        <MessageBox massMessage onSend={onMessageSend} />
      </Layout.Footer>
    </Layout.Root>
  );
};

export default Create;

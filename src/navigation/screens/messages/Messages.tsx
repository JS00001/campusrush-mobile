/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useEffect, useState } from "react";
import RemixIcon from "react-native-remix-icon";
import { MenuView } from "@react-native-menu/menu";
import { ActivityIndicator, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import TextInput from "@/ui/TextInput";
import StatusIcon from "@/ui/StatusIcon";
import IconButton from "@/ui/IconButton";
import ActionButton from "@/ui/ActionButton";
import Conversation from "@/components/Conversation";
import { useBottomSheets } from "@/providers/BottomSheet";
import { useConversations } from "@/providers/Conversations";

interface MessagesProps {
  navigation: NativeStackNavigationProp<any>;
}

const Messages: React.FC<MessagesProps> = ({ navigation }) => {
  // Import bottom sheets hook to show the "New Message" modal
  const { handlePresentModalPress } = useBottomSheets();
  // Import the conversations from the provider
  const { conversations, isLoading, isSendingMessage } = useConversations();
  // Create a state for the status message, and whether or not a message is being sent
  const [statusMessage, setStatusMessage] = useState<"SENDING" | "SENT" | "">(
    "SENDING",
  );

  // When the conversation has an update to the isSendingMessage state...
  useEffect(() => {
    // If a message is being sent, set the status message to "SENDING"
    if (isSendingMessage) {
      setStatusMessage("SENDING");
    } else if (statusMessage === "SENDING") {
      // If a message was being sent, and now it's not, set the status message to "SENT"
      setStatusMessage("SENT");
      // After 2 seconds, set the status message to an empty string, hiding it
      setTimeout(() => {
        setStatusMessage("");
      }, 2000);
    }
  }, [isSendingMessage]);

  // When the new chat action button is pressed, present the modal
  const onNewChatPress = () => {
    handlePresentModalPress("NEW_MESSAGE");
  };

  return (
    <>
      {/* Status message, only shown when a message is sent */}
      {statusMessage != "" && (
        <StatusIcon>
          <StatusIcon.Icon>
            {statusMessage == "SENDING" && (
              <ActivityIndicator size="large" color="white" />
            )}
            {statusMessage == "SENT" && (
              <RemixIcon name="ri-check-line" size={36} color="white" />
            )}
          </StatusIcon.Icon>
          {statusMessage == "SENT" && <StatusIcon.Text>Sent!</StatusIcon.Text>}
        </StatusIcon>
      )}

      {/* The floating action button in bottom right */}
      <ActionButton icon="ri-add-line" onPress={onNewChatPress} />

      {/* Content in the main layout */}
      <Layout scrollable gap={8}>
        <Layout.Header
          title="Messages"
          subtitle="Message potential new members"
        />

        {/* The top action bar for search and filter */}
        <View style={tw`flex-row w-full gap-x-1`}>
          <TextInput
            icon="ri-search-line"
            variant="alternate"
            placeholder="Search Messages"
            containerStyle={tw`flex-shrink`}
          />

          <MenuView
            title="Filter By"
            actions={[
              {
                id: "remove-filters",
                title: "No Filters",
                image: "xmark",
              },
              {
                id: "filter-by-unread-messages",
                title: "Unread Messages",
                image: "message",
              },
              {
                id: "filter-by-alphabetical",
                title: "Alphabetical",
                image: "textformat.abc",
              },
              {
                id: "filter-by-received-bid",
                title: "Received Bid",
                image: "person.badge.plus",
              },
            ]}
          >
            <IconButton icon="ri-filter-3-fill" style={tw`flex-grow`} />
          </MenuView>
        </View>

        {/* The conversations list */}
        {conversations.map((conversation) => (
          <Conversation key={conversation._id} conversation={conversation} />
        ))}
      </Layout>
    </>
  );
};

export default Messages;

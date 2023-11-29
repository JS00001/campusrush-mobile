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
import Conversations from "@/components/Conversations";
import useConversations from "@/hooks/useConversations";
import { useBottomSheets } from "@/providers/BottomSheet";
import { ConversationStatus } from "@/state/messaging/conversations";

interface MessagesProps {
  navigation: NativeStackNavigationProp<any>;
}

const Messages: React.FC<MessagesProps> = ({ navigation }) => {
  // Import the conversations and methods from the conversations provider
  const {
    status,
    isLoading,
    searchQuery,
    filterActions,
    conversations,
    onFilterPress,
    setSearchQuery,
  } = useConversations();

  // Import bottom sheets hook to show the "New Message" modal
  const { handlePresentModalPress } = useBottomSheets();

  // When the new chat action button is pressed, present the modal
  const onNewChatPress = () => {
    handlePresentModalPress("NEW_MESSAGE");
  };

  return (
    <>
      {/* Status message, only shown when a message is sent */}
      {status != ConversationStatus.Idle && (
        <StatusIcon>
          <StatusIcon.Icon>
            {status == ConversationStatus.Sending && (
              <ActivityIndicator size="large" color="white" />
            )}
            {status == ConversationStatus.Sent && (
              <RemixIcon name="ri-check-line" size={36} color="white" />
            )}
          </StatusIcon.Icon>
          {status == ConversationStatus.Sent && (
            <StatusIcon.Text>Sent!</StatusIcon.Text>
          )}
        </StatusIcon>
      )}

      {/* The floating action button in bottom right */}
      <ActionButton icon="ri-add-line" onPress={onNewChatPress} />

      {/* Content in the main layout */}
      <Layout gap={8}>
        <Layout.Header
          title="Messages"
          subtitle="Message potential new members"
        />

        {/* The top action bar for search and filter */}
        <View style={tw`flex-row w-full gap-x-1`}>
          <TextInput
            autoCorrect={false}
            icon="ri-search-line"
            variant="alternate"
            placeholder="Search Conversations"
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={tw`flex-shrink`}
          />

          <MenuView
            title="Filter By"
            actions={filterActions}
            onPressAction={onFilterPress}
          >
            <IconButton icon="ri-filter-3-fill" style={tw`flex-grow`} />
          </MenuView>
        </View>

        {/* The conversations that exist */}
        <Conversations loading={isLoading} conversations={conversations} />
      </Layout>
    </>
  );
};

export default Messages;

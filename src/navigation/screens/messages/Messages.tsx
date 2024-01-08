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
import Conversation from "@/ui/Conversation";
import InfiniteList from "@/components/InfiniteList";
import { useBottomSheets } from "@/providers/BottomSheet";
import { ConversationLoader } from "@/ui/Conversation/Loaders";
import useConversations from "@/hooks/messaging/useConversations";
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

    refetch,
    fetchNextPage,
    onFilterPress,
    setSearchQuery,
  } = useConversations();

  // Import bottom sheets hook to show the "New Message" modal
  const { handlePresentModalPress } = useBottomSheets();

  // When the new chat action button is pressed, present the modal
  const onNewChatPress = () => {
    handlePresentModalPress("NEW_MESSAGE");
  };

  const onRefresh = async () => {
    await refetch();
  };

  const onEndReached = async () => {
    await fetchNextPage();
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
            {status == ConversationStatus.Failed && (
              <RemixIcon name="ri-close-line" size={36} color="white" />
            )}
          </StatusIcon.Icon>
          {status == ConversationStatus.Sent && (
            <StatusIcon.Text>Sent!</StatusIcon.Text>
          )}
          {status == ConversationStatus.Failed && (
            <StatusIcon.Text>Failed to send</StatusIcon.Text>
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
        <InfiniteList
          loading={isLoading}
          data={conversations}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          loadingComponent={<ConversationLoader />}
          emptyListTitle="No Conversations Found"
          emptyListSubtitle="Try changing your filters or sending a new message"
          renderItem={({ item: conversation }) => (
            <Conversation conversation={conversation} />
          )}
        />
      </Layout>
    </>
  );
};

export default Messages;

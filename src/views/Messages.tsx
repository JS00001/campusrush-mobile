/*
 * Created on Tue Feb 27 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import useSearch from "@/hooks/useSearch";
import { useBottomSheets } from "@/providers/BottomSheet";

import tw from "@/lib/tailwind";
import TextInput from "@/ui/TextInput";
import IconButton from "@/ui/IconButton";
import Menu, { MenuAction } from "@/ui/Menu";
import ActionButton from "@/ui/ActionButton";
import Conversation from "@/ui/Conversation";
import InfiniteList from "@/components/InfiniteList";
import ConversationLoader from "@/ui/Loaders/Conversation";
import { useGetConversations } from "@/hooks/api/messaging";

const MessagesView = () => {
  const { openBottomSheet } = useBottomSheets();
  const conversationsQuery = useGetConversations();

  const search = useSearch({
    data: conversationsQuery.conversations,
    filters: [
      {
        id: "UNREAD",
        filterFn: (data) => data.filter((conversation) => !conversation.read),
      },
    ],
    fields: ["pnm"],
  });

  /**
   * Create the filter menu actions
   */
  const filterMenu: MenuAction[] = [
    {
      id: "NO_FILTER",
      title: "No Filter",
      image: "xmark",
      state: search.filter === "NO_FILTER" ? "on" : "off",
      onPress: () => search.setFilter("NO_FILTER"),
    },
    {
      id: "UNREAD",
      title: "Unread Messages",
      image: "message",
      state: search.filter === "UNREAD" ? "on" : "off",
      onPress: () => search.setFilter("UNREAD"),
    },
  ];

  const onNewChatPress = () => {
    openBottomSheet("CREATE_MESSAGE");
  };

  const onRefresh = async () => {
    await conversationsQuery.refetch();
  };

  const onEndReached = async () => {
    await conversationsQuery.fetchNextPage();
  };

  // TODO: Add loading state when messages are sending etc, (Status state)

  return (
    <>
      <View style={tw`flex-row w-full gap-x-1`}>
        <TextInput
          autoCorrect={false}
          icon="search-line"
          placeholder="Search Conversations"
          value={search.query}
          onChangeText={search.setQuery}
          contentContainerStyle={tw`flex-shrink`}
        />

        <Menu actions={filterMenu}>
          <IconButton
            color="secondary"
            iconName="filter-3-fill"
            style={tw`flex-grow`}
          />
        </Menu>
      </View>

      {/* The conversations that exist */}
      <InfiniteList
        data={search.data}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        loading={conversationsQuery.isLoading}
        emptyListTitle="No Conversations Found"
        emptyListSubtitle="Try changing your filters or sending a new message"
        loadingComponent={<ConversationLoader />}
        renderItem={({ item: conversation }) => (
          <Conversation conversation={conversation} />
        )}
      />

      <ActionButton icon="add-line" onPress={onNewChatPress} />
    </>
  );
};

export default MessagesView;

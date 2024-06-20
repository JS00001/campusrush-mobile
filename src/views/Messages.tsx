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
import { useBottomSheet } from "@/providers/BottomSheet";

import tw from "@/lib/tailwind";
import FlatList from "@/ui/FlatList";
import TextInput from "@/ui/TextInput";
import IconButton from "@/ui/IconButton";
import Menu, { MenuAction } from "@/ui/Menu";
import ActionButton from "@/ui/ActionButton";
import Conversation from "@/ui/Conversation";
import ConversationLoader from "@/ui/Loaders/Conversation";
import { useGetConversations } from "@/hooks/api/messaging";

const MessagesView = () => {
  const { openBottomSheet } = useBottomSheet();
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

  // Disable refresh if we search or filter or no next page. This is because
  // if there is 1 result for a search, the list will keep trying to refresh and
  // will fetch all of the pages without needing to
  const isRefetchDisabled =
    // Disable if there is no next page
    !conversationsQuery.hasNextPage ||
    // Disable if there is a search query (so if there is 1 result, it doesn't keep refreshing)
    !!search.query ||
    // Disable if there is a filter (so if there is 1 result, it doesn't keep refreshing)
    search.filter !== "NO_FILTER";

  const onNewChatPress = () => {
    openBottomSheet("CREATE_MESSAGE");
  };

  const onRefresh = async () => {
    await conversationsQuery.refetch();
  };

  const onEndReached = async () => {
    await conversationsQuery.fetchNextPage();
  };

  return (
    <>
      <View style={tw`flex-row w-full gap-x-1`}>
        <TextInput
          autoCorrect={false}
          icon="search-line"
          placeholder={"Search Conversations"}
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
      <FlatList
        data={search.data}
        loadingComponent={<ConversationLoader />}
        loading={conversationsQuery.isLoading}
        disableOnEndReached={isRefetchDisabled}
        emptyListTitle="No Conversations Found"
        emptyListSubtitle="Try changing your filters or sending a new message"
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        renderItem={({ item: conversation }) => (
          <Conversation conversation={conversation} />
        )}
      />

      <ActionButton icon="add-line" onPress={onNewChatPress} />
    </>
  );
};

export default MessagesView;

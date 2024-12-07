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

import { useState } from "react";
import { View } from "react-native";

import useSearch from "@/hooks/useSearch";
import { useBottomSheetStore } from "@/store";

import tw from "@/lib/tailwind";
import FlatList from "@/ui/FlatList";
import Searchbox from "@/ui/Searchbox";
import IconButton from "@/ui/IconButton";
import Menu, { MenuAction } from "@/ui/Menu";
import ActionButton from "@/ui/ActionButton";
import Conversation from "@/ui/ListItems/Conversation";
import ConversationLoader from "@/ui/Loaders/Conversation";
import { useGetConversations } from "@/hooks/api/conversations";

const MessagesView = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const bottomSheetStore = useBottomSheetStore();
  const conversationsQuery = useGetConversations(searchQuery);

  const search = useSearch({
    data: conversationsQuery.conversations,
    filters: [
      {
        id: "UNREAD",
        filterFn: (data) => data.filter((conversation) => !conversation.read),
      },
    ],
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
    bottomSheetStore.open("CREATE_MESSAGE");
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
        <Searchbox
          ph-label="search-conversations"
          autoCorrect={false}
          placeholder={"Search Conversations"}
          value={searchQuery}
          onChangeText={setSearchQuery}
          contentContainerStyle={tw`flex-shrink`}
        />

        <Menu actions={filterMenu}>
          <IconButton
            size="lg"
            color="secondary"
            iconName="FunnelSimple"
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

      <ActionButton
        ph-label="create-message"
        icon="Plus"
        onPress={onNewChatPress}
      />
    </>
  );
};

export default MessagesView;

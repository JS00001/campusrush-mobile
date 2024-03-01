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
import { useGetConversations } from "@/hooks/api/messaging";
import { ConversationLoader } from "@/ui/Conversation/Loaders";

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
      <ActionButton icon="ri-add-line" onPress={onNewChatPress} />

      <View style={tw`flex-row w-full gap-x-1`}>
        <TextInput
          autoCorrect={false}
          icon="ri-search-line"
          variant="alternate"
          placeholder="Search Conversations"
          value={search.query}
          onChangeText={search.setQuery}
          containerStyle={tw`flex-shrink`}
        />

        <Menu actions={filterMenu}>
          <IconButton icon="ri-filter-3-fill" style={tw`flex-grow`} />
        </Menu>
      </View>

      {/* The conversations that exist */}
      <InfiniteList
        data={search.data}
        onRefresh={onRefresh}
        onEndReached={onEndReached}
        loadingComponent={<ConversationLoader />}
        emptyListTitle="No Conversations Found"
        emptyListSubtitle="Try changing your filters or sending a new message"
        renderItem={({ item: conversation }) => (
          <Conversation conversation={conversation} />
        )}
        loading={
          conversationsQuery.isLoading &&
          !conversationsQuery.conversations?.length
        }
      />
    </>
  );
};

export default MessagesView;

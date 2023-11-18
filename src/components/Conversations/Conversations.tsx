/*
 * Created on Mon Oct 9 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import Conversation from "@/ui/Conversation";
import InfiniteScroll from "@/ui/InfiniteScroll";
import useConversations from "@/hooks/useConversations";

interface ConversationsProps {
  loading: boolean;
  conversations: Conversation[];
}

const Conversations: React.FC<ConversationsProps> = ({
  loading,
  conversations,
}) => {
  const { refetch, fetchNextPage } = useConversations();

  // On refresh, set is refetching to true and call the on refetch prop
  const onRefresh = async () => {
    await refetch();
  };

  const onEndReached = async () => {
    await fetchNextPage();
  };

  // The components for each item in the list view
  const ItemComponent = ({ item: conversation }: { item: Conversation }) => (
    <Conversation conversation={conversation} />
  );

  // The component to render when the list is empty
  const ListEmptyComponent = () => {
    if (loading) {
      return new Array(20)
        .fill(0)
        .map((_, i) => (
          <ListItem key={i} title="" subtitle="" loading pressable={false} />
        ));
    } else {
      return (
        <>
          <Text variant="title" style={tw`text-center mt-16`}>
            No conversations found
          </Text>
          <Text style={tw`text-center`}>
            Try changing your filters or sending a message{" "}
          </Text>
        </>
      );
    }
  };

  return (
    <InfiniteScroll
      contentContainerStyle={tw`gap-y-2 pb-6`}
      showsVerticalScrollIndicator={false}
      data={conversations}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      renderItem={ItemComponent}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default Conversations;

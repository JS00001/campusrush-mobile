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

import { useState } from "react";
import { FlatList } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";
import Conversation from "@/ui/Conversation";

interface ConversationsProps {
  loading: boolean;
  conversations: Conversation[];
  onRefetch?: () => Promise<void>;
}

const Conversations: React.FC<ConversationsProps> = ({
  loading,
  conversations,
  onRefetch,
}) => {
  // Whether or not the list is refreshing
  const [isRefetching, setIsRefetching] = useState(false);

  // On refresh, set is refetching to true and call the on refetch prop
  const onRefresh = async () => {
    setIsRefetching(true);
    await onRefetch?.();
    setIsRefetching(false);
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
          <Text variant="title" style={tw`text-center mt-16 text-primary`}>
            No conversations found
          </Text>
          <Text style={tw`text-slate-600`}>
            Try sending a message to someone
          </Text>
        </>
      );
    }
  };

  return (
    <FlatList
      style={tw`w-full`}
      contentContainerStyle={tw`gap-y-2 pb-6`}
      showsVerticalScrollIndicator={false}
      data={conversations}
      renderItem={ItemComponent}
      ListEmptyComponent={ListEmptyComponent}
      onRefresh={onRefresh}
      refreshing={isRefetching}
    />
  );
};

export default Conversations;

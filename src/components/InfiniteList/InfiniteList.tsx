/*
 * Created on Wed Dec 20 2023
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
import InfiniteScroll from "@/ui/InfiniteScroll";

interface InfiniteListProps<T> {
  loading: boolean;
  data: T[];
  onRefresh: () => Promise<void>;
  onEndReached: () => Promise<void>;
  renderItem: ({ item }: { item: T }) => React.ReactElement;
}

const InfiniteList = <T,>({
  loading,
  data,
  onRefresh,
  onEndReached,
  renderItem,
}: InfiniteListProps<T>) => {
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
            No content found
          </Text>
          <Text style={tw`text-center`}>Try changing your filters</Text>
        </>
      );
    }
  };

  return (
    <InfiniteScroll
      data={data}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={tw`gap-y-2 pb-6`}
    />
  );
};

export default InfiniteList;

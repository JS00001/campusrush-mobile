/*
 * Created on Mon Jan 08 2024
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
import { cloneElement } from "react";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { Infinite } from "@/ui/InfiniteScroll";
import ListItemLoader from "@/ui/Loaders/ListItem";

interface InfiniteHorizontaListProps<T> {
  data: T[];
  loading: boolean;

  loadingComponent?: React.ReactElement;

  emptyListTitle?: string;
  emptyListSubtitle?: string;

  onEndReached: () => Promise<void>;
  renderItem: ({ item }: { item: T }) => React.ReactElement;
}

const InfiniteHorizontaList = <T,>({
  data,
  loading,
  loadingComponent,
  emptyListTitle,
  emptyListSubtitle,
  onEndReached,
  renderItem,
}: InfiniteHorizontaListProps<T>) => {
  const ListEmptyComponent = () => {
    if (loading) {
      return new Array(10).fill(0).map((_, i) => {
        if (loadingComponent) return cloneElement(loadingComponent, { key: i });

        return <ListItemLoader key={i} />;
      });
    }

    return (
      <View style={tw`w-full `}>
        <Text type="h2" style={tw`text-center mt-16`}>
          {emptyListTitle || "No content found"}
        </Text>
        <Text style={tw`text-center`}>
          {emptyListSubtitle || "Try changing your filters"}
        </Text>
      </View>
    );
  };

  return (
    <Infinite.Carousel
      data={data}
      style={tw`flex-1`}
      onEndReached={onEndReached}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={tw.style(
        `gap-2`,
        !loading && data.length <= 0 && "w-full",
      )}
      renderItem={({ item }) => renderItem({ item })}
    />
  );
};

export default InfiniteHorizontaList;

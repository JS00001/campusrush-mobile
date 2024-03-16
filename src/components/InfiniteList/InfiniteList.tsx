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

import { cloneElement } from "react";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { Infinite } from "@/ui/InfiniteScroll";
import ListItemLoader from "@/ui/Loaders/ListItem";
import DeleteSwipable from "@/ui/Swipeable/Delete";

interface InfiniteListProps<T> {
  data: T[];
  loading: boolean;

  loadingComponent?: React.ReactElement;

  emptyListTitle?: string;
  emptyListSubtitle?: string;

  onRefresh: () => Promise<void>;
  onEndReached: () => Promise<void>;
  renderItem: ({ item }: { item: T }) => React.ReactElement;

  elementsDeletable?: boolean;
  onDeleteElement?: (item: T) => void;
}

const InfiniteList = <T,>({
  data,
  loading,
  loadingComponent,
  elementsDeletable,
  emptyListTitle,
  emptyListSubtitle,
  onRefresh,
  onEndReached,
  renderItem,
  onDeleteElement,
}: InfiniteListProps<T>) => {
  const ListEmptyComponent = () => {
    if (loading) {
      return new Array(20).fill(0).map((_, i) => {
        if (loadingComponent) return cloneElement(loadingComponent, { key: i });

        return <ListItemLoader key={i} />;
      });
    }

    return (
      <>
        <Text type="h2" style={tw`text-center mt-16`}>
          {emptyListTitle || "No content found"}
        </Text>
        <Text style={tw`text-center`}>
          {emptyListSubtitle || "Try changing your filters"}
        </Text>
      </>
    );
  };

  let rowRefs = new Map();

  const renderItemWithActions = ({ item }: { item: T }) => {
    const closeOtherSwipeables = () => {
      [...rowRefs.entries()].forEach(([key, ref]) => {
        if (key != item && ref) {
          ref.close();
        }
      });
    };

    const handleRef = (ref: any) => {
      if (ref && !rowRefs.get(item)) {
        rowRefs.set(item, ref);
      }
    };

    const onDeletePress = () => {
      if (onDeleteElement) {
        rowRefs.get(item).close();
        onDeleteElement(item);
        rowRefs.delete(item);
      }
    };

    if (elementsDeletable) {
      return (
        <DeleteSwipable
          ref={handleRef}
          onDelete={onDeletePress}
          onBegan={closeOtherSwipeables}
        >
          {renderItem({ item })}
        </DeleteSwipable>
      );
    }

    return renderItem({ item });
  };

  return (
    <Infinite.Scroll
      data={data}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      renderItem={renderItemWithActions}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={tw`gap-2 pb-6`}
    />
  );
};

export default InfiniteList;

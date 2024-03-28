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

import React, { useMemo, useState } from "react";
import { FlatList as RNFlatList } from "react-native";

import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import ListItemLoader from "@/ui/Loaders/ListItem";
import DeleteSwipable from "@/ui/Swipeable/Delete";

interface FlatListProps<T> {
  data: T[];
  loading: boolean;

  loadingComponent?: React.ReactElement;

  emptyListTitle?: string;
  emptyListSubtitle?: string;

  onRefresh: () => Promise<void>;
  renderItem: ({ item }: { item: T }) => React.ReactElement;

  elementsDeletable?: boolean;
  onDeleteElement?: (item: T) => void;
}

const FlatList = <T,>({
  data,
  loading,
  loadingComponent,
  elementsDeletable,
  emptyListTitle,
  emptyListSubtitle,
  onRefresh,
  renderItem,
  onDeleteElement,
}: FlatListProps<T>) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const LoadingComponent = useMemo(() => {
    const Component = loadingComponent || <ListItemLoader />;

    return new Array(20).fill(0).map((_, i) => {
      return <React.Fragment key={i}>{Component}</React.Fragment>;
    });
  }, [loadingComponent]);

  const ListEmptyComponent = () => {
    if (loading) {
      return LoadingComponent;
    }

    return (
      <Headline
        centerText
        style={tw`mt-16`}
        title={emptyListTitle || "No content found"}
        subtitle={emptyListSubtitle || "Try changing your filters"}
      />
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

  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  return (
    <RNFlatList
      data={data}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
      renderItem={renderItemWithActions}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={tw`gap-2 pb-6`}
    />
  );
};

export default FlatList;

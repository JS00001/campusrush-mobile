/*
 * Created on Sat Mar 16 2024
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
import { ActivityIndicator, FlatList, FlatListProps } from "react-native";

import tw from "@/lib/tailwind";

interface InfiniteScrollProps extends FlatListProps<any> {
  style?: any;
  onRefresh: () => void | Promise<void>;
  onEndReached: () => void | Promise<void>;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  style,
  onRefresh,
  onEndReached,
  ...props
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleEndReached = async () => {
    if (isFetching) return;

    setIsFetching(true);
    await onEndReached();
    setIsFetching(false);
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  const ListEndLoader = () => {
    if (!isFetching) return null;

    return (
      <ActivityIndicator
        size="small"
        style={tw`w-full p-2`}
        color={tw.color("slate-600")}
      />
    );
  };

  const listStyles = tw.style("w-full", style);

  return (
    <FlatList
      style={listStyles}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      onEndReachedThreshold={0.75}
      onEndReached={handleEndReached}
      ListFooterComponent={ListEndLoader}
      {...props}
    />
  );
};

export default InfiniteScroll;

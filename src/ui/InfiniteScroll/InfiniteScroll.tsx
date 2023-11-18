/*
 * Created on Fri Nov 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import tw from "@/lib/tailwind";
import { useState } from "react";
import { ActivityIndicator, FlatList, FlatListProps } from "react-native";

interface InfiniteScrollProps extends FlatListProps<any> {
  onRefresh: () => Promise<void>;
  onEndReached: () => Promise<void>;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  data,
  style,
  renderItem,
  onRefresh: onRefreshProp,
  onEndReached: onEndReachedProp,
  ...props
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onEndReached = async () => {
    if (isFetching) return;

    setIsFetching(true);
    await onEndReachedProp?.();
    setIsFetching(false);
  };

  const onRefresh = async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);
    await onRefreshProp?.();
    setIsRefreshing(false);
  };

  const ListEndLoader = () => {
    if (isFetching) {
      return (
        <ActivityIndicator
          style={tw`w-full p-2`}
          color={tw.color("slate-600")}
          size="small"
        />
      );
    }
    return null;
  };

  const listClasses = tw.style("w-full", style as any);

  return (
    <FlatList
      data={data}
      style={listClasses}
      renderItem={renderItem}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.75}
      ListFooterComponent={ListEndLoader}
      {...props}
    />
  );
};

export default InfiniteScroll;

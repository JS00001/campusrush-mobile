/*
 * Created on Thu Mar 28 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */
import {
  ActivityIndicator,
  FlatList as RNFlatList,
  FlatListProps as RNFlatListProps,
  View,
} from "react-native";
import React, { useState } from "react";

import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import ListItemLoader from "@/ui/Loaders/ListItem";

interface FlatListProps<T> extends Omit<RNFlatListProps<T>, "renderItem"> {
  /* The data to be rendered */
  data: T[];

  /* The component to render each item in the list */
  renderItem: ({ item }: { item: T }) => React.ReactElement;

  /* The style of the FlatList */
  style?: any;

  /* The content container style of this FlatList */
  contentContainerStyle?: any;

  /* Whether the list is loading or not (data being fetched) */
  loading?: boolean;

  /* Overrides the loading component to a custom one */
  loadingComponent?: React.ReactElement;

  /* The title of the empty list, defaults to "No Content Found" */
  emptyListTitle?: string;

  /* The subtitle of the empty list, defaults to "Try changing your filters" */
  emptyListSubtitle?: string;

  /* Only used if the list is refreshable, the action on refresh */
  onRefresh?: () => Promise<void>;

  /* Only used if the list is infinite, the action on end reached */
  onEndReached?: () => Promise<void>;
}

const FlatList = <T,>({
  data,
  renderItem,
  style,
  horizontal,
  contentContainerStyle,
  loading,
  loadingComponent,
  emptyListTitle = "No Content Found",
  emptyListSubtitle = "Try changing your filters",
  onRefresh,
  onEndReached,
  ...props
}: FlatListProps<T>) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  /**
   * When the end of the list of reached, check if it is an
   * infinite list, then attempt to fetch more data
   */
  const handleEndReached = async () => {
    if (!onEndReached) return;

    if (isFetching) return;

    setIsFetching(true);
    await onEndReached();
    setIsFetching(false);
  };

  /**
   * When the list is pulled down, check if it is a refreshable
   * list, then attempt to refresh the data
   */
  const handleRefresh = async () => {
    if (!onRefresh) return;

    if (isRefreshing) return;

    setIsRefreshing(true);
    await onRefresh();
    setIsRefreshing(false);
  };

  /**
   * Checks whether the list is fetching (infinite list loading more data)
   * and renders a loading indicator at the bottom of the list
   */
  const ListEndLoader = () => {
    if (!isFetching) return null;

    if (horizontal)
      return (
        <View style={tw`h-full justify-center`}>
          <ActivityIndicator
            size="small"
            style={tw`w-full p-2`}
            color={tw.color("slate-600")}
          />
        </View>
      );

    return (
      <ActivityIndicator
        size="small"
        style={tw`w-full p-2`}
        color={tw.color("slate-600")}
      />
    );
  };

  /**
   * The loading component is what is rendered when the list is
   * empty and loading
   */
  const LoadingComponent = () => {
    const Component = loadingComponent || <ListItemLoader />;

    return new Array(12).fill(0).map((_, index) => {
      return <React.Fragment key={index}>{Component}</React.Fragment>;
    });
  };

  /**
   * The list empty component has two options. If the component is empty because
   * it is loading data, it will render the loading component. If the component is
   * empty because there is no data, it will render the empty list component
   */
  const ListEmptyComponent = () => {
    if (loading) {
      return <LoadingComponent />;
    }

    return (
      <Headline
        centerText
        style={tw`mt-16`}
        title={emptyListTitle}
        subtitle={emptyListSubtitle}
      />
    );
  };

  const styles = tw.style("w-full", style);

  const contentContainerStyles = tw.style("gap-2 pb-6", contentContainerStyle);

  return (
    <RNFlatList
      data={data}
      renderItem={renderItem}
      refreshing={isRefreshing}
      style={styles}
      horizontal={horizontal}
      contentContainerStyle={contentContainerStyles}
      onEndReachedThreshold={0.75}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={ListEndLoader}
      ListEmptyComponent={ListEmptyComponent}
      // We have to do this so that horizontal lists cannot be
      // scrolled vertically bc of the refresh indicator
      onRefresh={onRefresh ? handleRefresh : undefined}
      onEndReached={handleEndReached}
      {...props}
    />
  );
};

export default FlatList;

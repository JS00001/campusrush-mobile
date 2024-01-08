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

import { useState } from "react";
import { ActivityIndicator, FlatList, FlatListProps, View } from "react-native";

import tw from "@/lib/tailwind";

interface InfiniteCarouselProps extends FlatListProps<any> {
  onEndReached: () => Promise<void>;
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
  data,
  style,
  renderItem,
  onEndReached: onEndReachedProp,
  ...props
}) => {
  const [isFetching, setIsFetching] = useState(false);

  const onEndReached = async () => {
    if (isFetching) return;

    setIsFetching(true);
    await onEndReachedProp?.();
    setIsFetching(false);
  };

  const ListEndLoader = () => {
    if (isFetching) {
      return (
        <View style={tw`h-full justify-center`}>
          <ActivityIndicator
            style={tw`w-full p-2`}
            color={tw.color("slate-600")}
            size="small"
          />
        </View>
      );
    }
    return null;
  };

  const listClasses = tw.style("w-full", style as any);

  return (
    <FlatList
      data={data}
      horizontal
      style={listClasses}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.75}
      ListFooterComponent={ListEndLoader}
      showsHorizontalScrollIndicator={false}
      {...props}
    />
  );
};

export default InfiniteCarousel;

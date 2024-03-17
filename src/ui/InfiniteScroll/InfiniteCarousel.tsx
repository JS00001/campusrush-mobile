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
  style?: any;
  onEndReached: () => void | Promise<void>;
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
  style,
  onEndReached,
  ...props
}) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleEndReached = async () => {
    if (isFetching) return;

    setIsFetching(true);
    await onEndReached();
    setIsFetching(false);
  };

  const ListEndLoader = () => {
    if (isFetching) {
      return (
        <View style={tw`h-full justify-center`}>
          <ActivityIndicator
            size="small"
            style={tw`w-full p-2`}
            color={tw.color("slate-600")}
          />
        </View>
      );
    }
    return null;
  };

  const listStyles = tw.style("w-full", style);

  return (
    <FlatList
      horizontal
      style={listStyles}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.75}
      ListFooterComponent={ListEndLoader}
      showsHorizontalScrollIndicator={false}
      {...props}
    />
  );
};

export default InfiniteCarousel;

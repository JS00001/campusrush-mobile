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

import { View } from "react-native";

import tw from "@/lib/tailwind";
import Skeleton from "@/ui/Skeleton";
import { ListItemSize } from "@/ui/ListItems/ListItem";
import HeadlineLoader from "@/ui/Loaders/Headline";

interface ListItemLoaderProps {
  size?: ListItemSize;
  style?: any;
}

const ListItemLoader: React.FC<ListItemLoaderProps> = ({
  size = "md",
  style,
}) => {
  const containerStyles = tw.style(
    "bg-gray-100 rounded-xl gap-4",
    size === "sm" && "p-4 gap-y-2 flex-col",
    size === "md" && "px-3 py-4 justify-between items-center flex-row w-full",
    size === "lg" && "px-7 py-4 justify-between items-center flex-row w-full",
    style,
  );

  const contentContainerStyles = tw.style(
    "shrink",
    size === "sm" && "flex-col gap-y-2",
    size === "md" && "flex-row gap-x-2 items-center",
    size === "lg" && "flex-row gap-x-5 items-center",
  );

  const iconStyles = tw.style(
    size === "sm" && "rounded-lg p-2 bg-gray-100 self-start",
  );

  return (
    <View style={containerStyles}>
      <View style={contentContainerStyles}>
        <View style={iconStyles}>
          {size === "lg" && <Skeleton width={32} height={32} />}
          {size === "md" && <View style={tw`w-6 h-6`} />}
          {size === "sm" && <Skeleton width={24} height={24} />}
        </View>

        <HeadlineLoader />
      </View>
    </View>
  );
};

export default ListItemLoader;

/*
 * Created on Sun Jan 07 2024
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

export const ListItemLoader = () => {
  const containerClasses = tw.style(
    "bg-slate-100 w-full p-4 rounded-lg",
    "flex-row items-center",
  );

  return (
    <View style={containerClasses}>
      <View style={tw`gap-3 items-center flex-row`}>
        <View style={tw`w-3.5`} />

        <View style={tw`flex-1 gap-y-1`}>
          <Skeleton width="w-40" height="h-5" />
          <Skeleton height="h-4" />
        </View>
      </View>
    </View>
  );
};

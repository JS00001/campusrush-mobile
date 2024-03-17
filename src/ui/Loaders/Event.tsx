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

const EventLoader = () => {
  const containerClasses = tw.style(
    "bg-slate-100 w-full p-4 rounded-xl gap-6",
    "flex-row items-center",
  );

  return (
    <View style={containerClasses}>
      <View style={tw`flex-row gap-5 flex-shrink`}>
        {/* Date and Time */}
        <Skeleton width="w-16" height="h-18" />

        {/* Information */}
        <View style={tw`flex-1 gap-y-2`}>
          <Skeleton width="w-40" height="h-6" />
          <Skeleton height="h-4" />
          <Skeleton height="h-4" />
        </View>
      </View>
    </View>
  );
};

export default EventLoader;

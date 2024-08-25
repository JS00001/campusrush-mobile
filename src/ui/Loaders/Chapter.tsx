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

const ChapterLoader = () => {
  return (
    <View style={tw`bg-slate-100 rounded-xl p-5 gap-y-3`}>
      <View style={tw`gap-y-1`}>
        <Skeleton width="w-40" height="h-5" />
        <Skeleton height="h-4" />
      </View>

      <View style={tw`flex-row items-center gap-2`}>
        <View style={tw`p-4 rounded-full bg-slate-200`} />

        <Skeleton height="h-4" style={tw`flex-1`} />
      </View>

      <View style={tw`flex-row items-center gap-2`}>
        <View style={tw`p-4 rounded-full bg-slate-200`} />

        <Skeleton height="h-4" style={tw`flex-1`} />
      </View>
    </View>
  );
};

export default ChapterLoader;

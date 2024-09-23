/*
 * Created on Wed Sep 18 2024
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

const NotificationLoader: React.FC = () => {
  const containerStyles = tw.style(
    "bg-slate-100 p-4 rounded-xl",
    "flex-row gap-4 items-center",
  );

  return (
    <View style={containerStyles}>
      <View style={tw`p-4 rounded-full bg-slate-200`} />
      <View style={tw`gap-2 flex-1`}>
        <Skeleton height="h-5" />
        <Skeleton width="w-32" height="h-4" />
      </View>
    </View>
  );
};

export default NotificationLoader;

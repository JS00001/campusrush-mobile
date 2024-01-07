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

export const ActionCardLgLoader = () => {
  const containerClasses = tw.style(
    "rounded-lg bg-slate-100 shadow-sm",
    "px-6 py-5 w-full flex-row items-center justify-between",
  );

  const childContainerClasses = tw.style("flex-row items-center gap-4 flex-1");

  return (
    <View style={containerClasses}>
      <View style={childContainerClasses}>
        {/* Left side icon */}
        <Skeleton width={24} height={24} />

        {/* Title and subtitle for size=lg */}
        <View style={tw.style("flex-1 gap-y-2")}>
          <Skeleton width="w-40" height="h-4" />
          <Skeleton height="h-6" />
        </View>
      </View>
    </View>
  );
};

export const ActionCardMdLoader = () => {
  const containerClasses = tw.style(
    "rounded-lg bg-slate-100 shadow-sm",
    "p-3 flex-1",
  );

  const childContainerClasses = tw.style("flex-col gap-y-2.5");

  return (
    <View style={containerClasses}>
      <View style={childContainerClasses}>
        {/* Left side icon */}
        <Skeleton width={40} height={40} />

        {/* Title and subtitle for size=lg */}
        <View style={tw.style("gap-y-2 overflow-hidden ")}>
          <Skeleton width="w-20" height="h-10" />
          <Skeleton height="h-4" />
          <Skeleton height="h-4" />
        </View>
      </View>
    </View>
  );
};

export const ActionCardSmLoader = () => {
  const containerClasses = tw.style(
    "rounded-lg bg-slate-100 shadow-sm",
    "p-3 flex-1",
  );

  const childContainerClasses = tw.style("flex-col gap-y-2.5");

  return (
    <View style={containerClasses}>
      <View style={childContainerClasses}>
        {/* Left side icon */}
        <Skeleton width={36} height={36} />

        {/* Title and subtitle for size=lg */}
        <View style={tw.style("gap-y-2 overflow-hidden ")}>
          <Skeleton width="w-20" height="h-6" />
          <Skeleton height="h-4" />
          <Skeleton height="h-4" />
        </View>
      </View>
    </View>
  );
};

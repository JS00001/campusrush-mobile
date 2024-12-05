/*
 * Created on Sat Nov 30 2024
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

const FormResponseLoader = () => {
  const containerClasses = tw.style(
    "bg-gray-100 w-full p-4 rounded-xl gap-6",
    "flex-row items-center",
  );

  return (
    <View style={containerClasses}>
      <View style={tw`gap-2 flex-shrink`}>
        <Skeleton height="h-6" width="w-72" />
        <Skeleton height="h-12" width="w-64" />
        <Skeleton height="h-12" width="w-64" />
        <Skeleton width="w-40" height="h-4" />
      </View>
    </View>
  );
};

export default FormResponseLoader;

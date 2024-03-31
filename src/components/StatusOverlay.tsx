/*
 * Created on Thu Feb 29 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */
/*
 * Created on Sun Oct 8 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import React from "react";
import { ActivityIndicator, View } from "react-native";

import tw from "@/lib/tailwind";
import { useStatusStore } from "@/store";

const StatusOverlay = () => {
  const status = useStatusStore((state) => state.status);

  const containerClasses = tw.style(
    "inset-0 z-50 absolute items-center justify-center",
    "bg-black bg-opacity-50",
    status === "idle" && "hidden",
  );

  const contentContainerClasses = tw.style(
    "bg-black w-24 h-24 items-center justify-center rounded-md gap-2",
  );

  return (
    <View style={containerClasses}>
      <View style={contentContainerClasses}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </View>
  );
};

export default StatusOverlay;

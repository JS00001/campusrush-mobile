/*
 * Created on Sun Mar 17 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View, ViewProps } from "react-native";

import tw from "@/lib/tailwind";
import Skeleton from "@/ui/Skeleton";

const HeadlineLoader: React.FC<ViewProps> = ({ style, ...props }) => {
  return (
    <View style={tw.style(`w-full gap-y-2 shrink`, style as any)} {...props}>
      <Skeleton height={20} width={"75%"} borderRadius={6} />
      <Skeleton height={16} borderRadius={6} />
    </View>
  );
};

export default HeadlineLoader;

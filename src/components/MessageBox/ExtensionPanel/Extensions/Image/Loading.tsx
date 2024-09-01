/*
 * Created on Fri Mar 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { TouchableOpacity, View } from "react-native";

import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";
import Skeleton from "@/ui/Skeleton";

const ImageLoading = () => {
  const removeButtonStyles = tw.style(
    "absolute -top-3.5 -right-3.5 rounded-full p-2",
    "disabled",
  );

  return (
    <View>
      <Skeleton height={60} width={60} borderRadius={12} />

      <TouchableOpacity disabled style={removeButtonStyles}>
        <View style={tw`bg-slate-500 rounded-full p-0.5`}>
          <Icon name="close-line" size={14} color={tw.color("white")} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImageLoading;

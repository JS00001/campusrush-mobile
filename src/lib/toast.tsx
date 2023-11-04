/*
 * Created on Sun Aug 27 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View } from "react-native";
import RemixIcon from "react-native-remix-icon";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

const toastContainerClasses = tw.style(
  // Sizing
  "w-11/12 mt-2 flex-row gap-4 p-4 rounded-md",
  // Colors
  "bg-[#2D2D2D] shadow-md",
);

const toastText1Classes = tw.style(
  // Sizing
  "text-white font-medium",
);

const toastText2Classes = tw.style(
  // Sizing
  "text-slate-200",
);

const toastConfig = {
  success: (props: any) => (
    <View style={toastContainerClasses}>
      <RemixIcon name="ri-checkbox-circle-line" size={24} color="#10B981" />
      <View style={tw`flex-1`}>
        <Text variant="body" style={toastText1Classes}>
          {props.text1}
        </Text>
        <Text style={toastText2Classes}>{props.text2}</Text>
      </View>
    </View>
  ),

  error: (props: any) => (
    <View style={toastContainerClasses}>
      <RemixIcon name="ri-error-warning-line" size={24} color="#EF4444" />
      <View style={tw`flex-1`}>
        <Text variant="body" style={toastText1Classes}>
          {props.text1}
        </Text>
        <Text style={toastText2Classes}>{props.text2}</Text>
      </View>
    </View>
  ),
};

export default toastConfig;

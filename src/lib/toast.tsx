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

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

const toastContainerClasses = tw.style(
  // Sizing
  "w-11/12 flex-row gap-4 p-4 rounded-lg",
  // Colors
  "bg-slate-800 shadow-md",
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
  /**
   * The successs modal, shows a green checkmark with the content
   */
  success: (props: any) => (
    <View style={toastContainerClasses}>
      <Icon name="checkbox-circle-line" size={24} color="#10B981" />
      <View style={tw`flex-1`}>
        <Text style={toastText1Classes} numberOfLines={1}>
          {props.text1}
        </Text>
        <Text style={toastText2Classes} numberOfLines={2}>
          {props.text2}
        </Text>
      </View>
    </View>
  ),
  /**
   * The error modal, shows a red warning icon with the content
   */
  error: (props: any) => (
    <View style={toastContainerClasses}>
      <Icon name="error-warning-line" size={24} color="#EF4444" />
      <View style={tw`flex-1`}>
        <Text style={toastText1Classes} numberOfLines={1}>
          {props.text1}
        </Text>
        <Text style={toastText2Classes} numberOfLines={2}>
          {props.text2}
        </Text>
      </View>
    </View>
  ),
  /**
   * The warning modal, shows a yellow warning icon with the content
   */
  warning: (props: any) => (
    <View style={toastContainerClasses}>
      <Icon name="error-warning-line" size={24} color="#F59E0B" />
      <View style={tw`flex-1`}>
        <Text style={toastText1Classes} numberOfLines={1}>
          {props.text1}
        </Text>
        <Text style={toastText2Classes} numberOfLines={2}>
          {props.text2}
        </Text>
      </View>
    </View>
  ),
  /**
   * The info modal, shows a blue info icon with the content
   */
  info: (props: any) => (
    <View style={toastContainerClasses}>
      <Icon name="information-line" size={24} color="#3B82F6" />
      <View style={tw`flex-1`}>
        <Text style={toastText1Classes} numberOfLines={1}>
          {props.text1}
        </Text>
        <Text style={toastText2Classes} numberOfLines={2}>
          {props.text2}
        </Text>
      </View>
    </View>
  ),
};

export default toastConfig;

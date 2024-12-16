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

import { TouchableOpacity, View } from "react-native";
import type { BaseToastProps } from "react-native-toast-message";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

const toastContainerClasses = tw.style(
  "w-11/12 flex-row gap-4 p-4 rounded-lg",
  "bg-gray-800 shadow-md",
);

const toastText1Classes = tw.style("text-white font-medium");
const toastText2Classes = tw.style("text-gray-200");

const toastConfig = {
  /**
   * The successs modal, shows a green checkmark with the content
   */
  success: (props: BaseToastProps) => (
    <TouchableOpacity
      style={toastContainerClasses}
      disabled={isNoop(props.onPress)}
      onPress={props.onPress}
    >
      <Icon icon="CheckCircle" color="#10B981" />
      <View style={tw`flex-1`}>
        <Text style={toastText1Classes} numberOfLines={1}>
          {props.text1}
        </Text>
        <Text style={toastText2Classes} numberOfLines={2}>
          {props.text2}
        </Text>
      </View>
    </TouchableOpacity>
  ),
  /**
   * The error modal, shows a red warning icon with the content
   */
  error: (props: BaseToastProps) => (
    <TouchableOpacity
      style={toastContainerClasses}
      disabled={isNoop(props.onPress)}
      onPress={props.onPress}
    >
      <Icon icon="WarningCircle" color="#EF4444" />
      <View style={tw`flex-1`}>
        <Text style={toastText1Classes} numberOfLines={1}>
          {props.text1}
        </Text>
        <Text style={toastText2Classes} numberOfLines={2}>
          {props.text2}
        </Text>
      </View>
    </TouchableOpacity>
  ),
  /**
   * The warning modal, shows a yellow-500 warning icon with the content
   */
  warning: (props: BaseToastProps) => (
    <TouchableOpacity
      style={toastContainerClasses}
      disabled={isNoop(props.onPress)}
      onPress={props.onPress}
    >
      <Icon icon="Warning" size={24} color="#F59E0B" />
      <View style={tw`flex-1`}>
        <Text style={toastText1Classes} numberOfLines={1}>
          {props.text1}
        </Text>
        <Text style={toastText2Classes} numberOfLines={2}>
          {props.text2}
        </Text>
      </View>
    </TouchableOpacity>
  ),
  /**
   * The info modal, shows a blue info icon with the content
   */
  info: (props: BaseToastProps) => {
    return (
      <TouchableOpacity
        style={toastContainerClasses}
        disabled={isNoop(props.onPress)}
        onPress={props.onPress}
      >
        <Icon icon="Info" size={24} color="#3B82F6" />
        <View style={tw`flex-1`}>
          <Text style={toastText1Classes} numberOfLines={1}>
            {props.text1}
          </Text>
          <Text style={toastText2Classes} numberOfLines={2}>
            {props.text2}
          </Text>
        </View>
      </TouchableOpacity>
    );
  },
};

const isNoop = (func: any) => {
  const isFunction = typeof func === "function";
  const isNoop = func
    .toString()
    .replace(/\s/g, "")
    .startsWith("functionnoop()");

  return !isFunction || isNoop;
};

export default toastConfig;

/*
 * Created on Wed Dec 27 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import RNDateTimePicker, {
  IOSNativeProps,
} from "@react-native-community/datetimepicker";
import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface DateTimePickerProps extends IOSNativeProps {
  label: string;
  error?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  error,
  disabled,
  ...props
}) => {
  const containerClasses = tw.style(
    "pt-7 pb-2 w-full flex-row items-center justify-between rounded-xl h-16",
    "border-2 bg-slate-100 border-slate-100",
    disabled && "bg-slate-50 border-slate-50",
    error && "border-red-500 ",
  );

  const labelClasses = tw.style(
    "text-xs text-slate-400 shrink absolute top-1 left-4",
    disabled && "text-slate-300",
    error && "text-red-500",
  );

  return (
    <View style={tw`w-full`}>
      <View style={containerClasses}>
        <Text numberOfLines={1} style={labelClasses}>
          {error || label}
        </Text>

        <View
          style={tw.style("-mx-28 w-full", {
            transform: [{ scale: 0.8 }],
          })}
        >
          <RNDateTimePicker
            accentColor={tw.color("primary")}
            disabled={disabled}
            {...props}
          />
        </View>
      </View>
    </View>
  );
};

export default DateTimePicker;

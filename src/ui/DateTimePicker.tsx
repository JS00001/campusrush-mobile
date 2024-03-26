/*
 * Created on Fri Mar 08 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import RNDateTimePicker, {
  IOSNativeProps as RNDateTimePickerProps,
} from "@react-native-community/datetimepicker";
import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface DateTimePickerProps extends RNDateTimePickerProps {
  mode: "date" | "time" | "datetime";
  label: string;
  error?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  error,
  disabled,
  ...props
}) => {
  const containerStyles = tw.style(
    "pt-7 pb-2 w-full h-16 rounded-xl",
    "flex-row items-center justify-between",
    "border-2 bg-slate-100 border-slate-100",
    disabled && "disabled",
    error && "border-red",
  );

  const labelStyles = tw.style(
    "text-xs text-slate-400 shrink absolute top-1 left-4",
    error && "text-red",
  );

  const datePickerStyles = tw.style("w-full items-start -mx-6", {
    transform: [{ scale: 0.8 }],
  });

  return (
    <View style={tw`w-full`}>
      <View style={containerStyles}>
        <Text numberOfLines={1} style={labelStyles}>
          {error || label}
        </Text>

        <View style={datePickerStyles}>
          <RNDateTimePicker
            disabled={disabled}
            accentColor={tw.color("primary")}
            {...props}
          />
        </View>
      </View>
    </View>
  );
};

export default DateTimePicker;

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
import { useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";

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
  const viewRef = useRef<View>(null);
  const [rightOffset, setRightOffset] = useState(0);

  const onDatePickerLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;

    setRightOffset(width);
  };

  const containerStyles = tw.style(
    "w-full h-14 rounded-xl p-3 -gap-8",
    "flex-row items-center justify-between",
    "border-2 bg-gray-100 border-gray-100",
    disabled && "disabled",
    error && "border-red-500",
  );

  const labelStyles = tw.style("text-base shrink", error && "text-red-500");

  const datePickerStyles = tw.style({
    // This gets the color more accurate to the design
    // (we cant directly edit the background color of the date picker component)
    opacity: 0.8,
    // This makes the date picker smaller and more accurate to the design
    // (we cant directly edit the size of the date picker component)
    transform: [{ scale: 0.8 }],
    // This makes the date picker go to the right side of the screen and not have wierd
    // padding due to the scaling. We need to use a custom right padding for each type of
    // date picker (date, time, datetime) because the scale messes with the width of each type
    // of date picker, so we need to adjust the right padding accordingly
    right: -rightOffset * 0.1,
  });

  return (
    <View style={tw`w-full`}>
      <View style={containerStyles}>
        <Text numberOfLines={1} style={labelStyles}>
          {error || label}
        </Text>

        <View
          ref={viewRef}
          style={datePickerStyles}
          onLayout={onDatePickerLayout}
        >
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

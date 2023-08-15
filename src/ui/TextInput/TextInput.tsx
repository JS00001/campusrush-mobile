/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import {
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  Pressable,
  Animated,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface TextInputWithDefaultProps extends RNTextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

const TextInputWithNoFontScaling = Object.assign(RNTextInput, {
  defaultProps: {
    ...(RNTextInput as unknown as TextInputWithDefaultProps).defaultProps,
    allowFontScaling: false,
  },
});

interface TextInputProps extends RNTextInputProps {
  placeholder: string;
  disabled?: boolean;
  containerStyle?: any;
  inputStyle?: any;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  disabled,
  inputStyle,
  containerStyle,
  error,
  ...props
}) => {
  // Create a ref so we can focus the input from the container
  const textInputRef = useRef<RNTextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const placeholderY = useRef(new Animated.Value(20)).current;
  const placeholderSize = useRef(new Animated.Value(18)).current;

  const containerClasses = tw.style("relative w-full", containerStyle);

  const inputClasses = tw.style(
    // Input Sizing
    "border p-5 rounded-md z-10 text-lg leading-5",
    // Input Styling
    " bg-transparent",
    // Error Styling
    error ? "border-red-500" : "border-slate-400",
    inputStyle,
  );
  const labelClasses = tw.style(
    "absolute left-3 -z-10 bg-white px-1",
    error ? "text-red-500" : "text-slate-500",
  );

  // Animate between placeholder and label state
  const animatePlaceholder = (toValue: number, fontSize: number) => {
    Animated.parallel([
      Animated.timing(placeholderY, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(placeholderSize, {
        toValue: fontSize,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const onContainerPress = () => {
    textInputRef.current?.focus();
  };

  return (
    <Pressable style={containerClasses} onPress={onContainerPress}>
      <TextInputWithNoFontScaling
        placeholder={placeholder}
        placeholderTextColor={"transparent"}
        ref={textInputRef}
        editable={!disabled}
        style={inputClasses}
        onFocus={() => {
          setIsFocused(true);
          animatePlaceholder(-8, 14);
        }}
        onBlur={() => {
          setIsFocused(false);
          if (!props?.value) animatePlaceholder(20, 18);
        }}
        {...props}
      />

      <Animated.Text
        style={[labelClasses, { top: placeholderY, fontSize: placeholderSize }]}
      >
        {error ?? placeholder}
      </Animated.Text>
    </Pressable>
  );
};

export default TextInput;

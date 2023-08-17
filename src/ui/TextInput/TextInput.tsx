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
  Animated,
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { useRef, useState } from "react";

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
  onFocus?: () => void;
  onBlur?: () => void;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  disabled,
  inputStyle,
  containerStyle,
  error,
  onFocus,
  onBlur,
  ...props
}) => {
  // Create a ref to the text input so we can focus the input programmatically
  const textInputRef = useRef<RNTextInput>(null);
  // Create a ref to the placeholder's y position
  const placeholderY = useRef(new Animated.Value(20)).current;
  // Create a ref to the placeholder's size
  const placeholderSize = useRef(new Animated.Value(18)).current;

  // Whether the input is focused or not
  const [_, setIsFocused] = useState(false);

  // Animate between placeholder and label state
  const animatePlaceholder = (toValue: number, fontSize: number) => {
    Animated.parallel([
      // Animate the placeholder up and down
      Animated.timing(placeholderY, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }),
      // Animate the placeholder size
      Animated.timing(placeholderSize, {
        toValue: fontSize,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Focus the input when anywhere in the input container is pressed
  const onContainerPress = () => {
    textInputRef.current?.focus();
  };

  // Styling
  const containerClasses = tw.style(
    // Positioning and size
    "relative w-full -z-10",
    // Passed in container styles
    containerStyle,
  );

  const inputClasses = tw.style(
    // Input Sizing
    "border p-5 rounded-md text-lg leading-5",
    // Error Styling
    error ? "border-red-500" : "border-slate-400",
    // Passed in input styles
    inputStyle,
  );

  const labelClasses = tw.style(
    // Label Sizing and Styling
    "absolute left-3 -z-10 bg-white px-1",
    // If there is an error, make the label red
    error ? "text-red-500" : "text-slate-500",
  );

  return (
    <Pressable style={containerClasses} onPress={onContainerPress}>
      <TextInputWithNoFontScaling
        placeholder={placeholder}
        placeholderTextColor={"transparent"}
        ref={textInputRef}
        editable={!disabled}
        style={inputClasses}
        onFocus={() => {
          // Animate the placeholder up on focus
          setIsFocused(true);
          animatePlaceholder(-8, 14);
          // If there is an onFocus prop, call it
          // This allows us to pass an onFocus prop to this component,
          // while still being able to use the onFocus prop on the TextInput
          onFocus?.();
        }}
        onBlur={() => {
          // Animate the placeholder back down on blur
          setIsFocused(false);
          if (!props?.value) animatePlaceholder(20, 18);
          // If there is an onBlur prop, call it
          // This allows us to pass an onBlur prop to this component,
          // while still being able to use the onBlur prop on the TextInput
          onBlur?.();
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

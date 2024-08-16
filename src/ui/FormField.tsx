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

import {
  Animated,
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";

// This is a hack to disable font scaling for all text input components
const TextInputWithNoFontScaling = Object.assign(RNTextInput, {
  defaultProps: {
    ...(RNTextInput as any).defaultProps,
    allowFontScaling: false,
  },
});

interface FormFieldProps extends RNTextInputProps {
  placeholder: string;
  style?: any;
  contentContainerStyle?: any;
  error?: string;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  placeholder,
  disabled,
  style,
  contentContainerStyle,
  error,
  value,
  secureTextEntry,
  onFocus,
  onBlur,
  onChangeText,
  ...props
}) => {
  const inputRef = useRef<RNTextInput>(null);
  const placeholderY = useRef(new Animated.Value(20)).current;
  const placeholderSize = useRef(new Animated.Value(18)).current;

  const [focused, setFocused] = useState(false);
  const [hideValue, setHideValue] = useState(secureTextEntry);

  // If we have a value when we load the component, animate the placeholder up
  useEffect(() => {
    if (value) animatePlaceholder(10, 12);
  }, []);

  // If we set a value to undefined (clearing the input), animate the placeholder back down
  useEffect(() => {
    if (value === undefined) {
      animatePlaceholder(20, 18);
    }
  }, [value]);

  /**
   * Animate between the placeholder's focused and unfocused states
   */
  const animatePlaceholder = (toYValue: number, toFontSize: number) => {
    Animated.parallel([
      // Animate the placeholder up and down
      Animated.timing(placeholderY, {
        toValue: toYValue,
        duration: 200,
        useNativeDriver: false,
      }),
      // Animate the placeholder font size up and down
      Animated.timing(placeholderSize, {
        toValue: toFontSize,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  /**
   * When the container is pressed, focus the input (this is a hack
   * to make the entire container pressable)
   */
  const onContainerPress = () => {
    inputRef.current?.focus();
  };

  const onEyePress = () => {
    setHideValue((prev) => !prev);
  };

  const containerStyles = tw.style(
    "relative w-full -z-10",
    disabled && "disabled",
    contentContainerStyle,
  );

  const inputStyles = tw.style(
    "border-2 px-5 py-5 rounded-xl text-lg leading-5 bg-slate-100",
    // If we have an 'eye' icon, we need to add padding to the right of the input so we dont go under it
    secureTextEntry && "pr-12",
    // If there is a value or the input is focused, we need to add padding to the input to make it "look"
    // like the placeholder is in the input and they are both centered
    (focused || value) && "pt-7 pb-3",
    // DEFAULT State
    !error && !focused && "border-slate-100",
    // FOCUS State
    !error && focused && "border-slate-200",
    // ERROR State
    error && "border-red",
    style,
  );

  const placeholderStyles = [
    tw.style(
      "absolute z-10 px-4 bg-slate-100 left-1 text-slate-500 flex-1",
      disabled && "disabled",
      error && "text-red",
    ),
    { top: placeholderY, fontSize: placeholderSize },
  ];

  const valueStyles = tw.style("text-lg leading-5 text-primary");

  const eyeContainerStyles = tw.style(
    "absolute z-10 right-0 px-4",
    "h-full justify-center",
  );

  const eyeIconName = hideValue ? "eye-line" : "eye-off-line";

  return (
    <Pressable style={containerStyles} onPress={onContainerPress}>
      <TextInputWithNoFontScaling
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={"transparent"}
        editable={!disabled}
        style={inputStyles}
        onChangeText={onChangeText}
        secureTextEntry={hideValue}
        onFocus={(e) => {
          onFocus?.(e);
          setFocused(true);
          animatePlaceholder(10, 12);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          setFocused(false);

          if (!value) animatePlaceholder(20, 18);
        }}
        {...props}
      >
        <Text style={valueStyles}>{value}</Text>
      </TextInputWithNoFontScaling>

      {/* The placeholder, which animates up and down */}
      <Animated.Text numberOfLines={1} style={placeholderStyles}>
        {error || placeholder}
      </Animated.Text>

      {/* When using a password input, the eye to reveal the password */}
      {secureTextEntry && (
        <TouchableOpacity style={eyeContainerStyles} onPress={onEyePress}>
          <Icon name={eyeIconName} color={tw.color("slate-400")} size={16} />
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

export default FormField;

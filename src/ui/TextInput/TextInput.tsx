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
import { useEffect, useRef, useState } from "react";

import tw from "@/lib/tailwind";
import RemixIcon from "react-native-remix-icon";

// This is a hack to disable font scaling for all text components
export interface TextInputWithDefaultProps extends RNTextInput {
  defaultProps?: { allowFontScaling?: boolean };
}

// This is a hack to disable font scaling for all text components
export const TextInputWithNoFontScaling = Object.assign(RNTextInput, {
  defaultProps: {
    ...(RNTextInput as unknown as TextInputWithDefaultProps).defaultProps,
    allowFontScaling: false,
  },
});

interface TextInputProps extends RNTextInputProps {
  variant?: "default" | "alternate";
  placeholder: string;
  disabled?: boolean;
  containerStyle?: any;
  inputStyle?: any;
  error?: string;
  value?: string;
  // ONLY CAN BE SET IF VARIANT IS "alternate"
  icon?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
}

// This simply acts as a "proxy" component to render the correct text input
const TextInput: React.FC<TextInputProps> = ({
  variant = "default",
  placeholder,
  disabled,
  inputStyle,
  containerStyle,
  error,
  value,
  icon,
  onChangeText,
  onFocus,
  onBlur,
  ...props
}) => {
  if (variant === "default") {
    return (
      <DefaultTextInput
        placeholder={placeholder}
        disabled={disabled}
        inputStyle={inputStyle}
        containerStyle={containerStyle}
        error={error}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    );
  } else if (variant === "alternate") {
    return (
      <AlternateTextInput
        placeholder={placeholder}
        disabled={disabled}
        inputStyle={inputStyle}
        containerStyle={containerStyle}
        error={error}
        value={value}
        icon={icon}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    );
  }

  return <></>;
};

const DefaultTextInput: React.FC<TextInputProps> = ({
  placeholder,
  disabled,
  inputStyle,
  containerStyle,
  error,
  value,
  onChangeText,
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
  const [focused, setIsFocused] = useState(false);

  // Animate between placeholder and label state
  const animatePlaceholder = (toValue: number, fontSize: number) => {
    Animated.parallel([
      // Animate the placeholder up and down
      Animated.timing(placeholderY, {
        toValue,
        duration: 200,
        useNativeDriver: false,
      }),
      // Animate the placeholder size
      Animated.timing(placeholderSize, {
        toValue: fontSize,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // Focus the input when anywhere in the input container is pressed
  const onContainerPress = () => {
    textInputRef.current?.focus();
  };

  // On initial load, animate the placeholder if there is a value
  useEffect(() => {
    if (value) {
      animatePlaceholder(10, 12);
    }
  }, []);

  // Styling
  const containerClasses = tw.style(
    // Positioning and size
    "relative w-full -z-10",
    // Passed in container styles
    containerStyle,
  );

  const inputClasses = tw.style(
    // Input Sizing
    "border-2 px-5 py-5 rounded-xl text-lg leading-5 bg-slate-100 ",
    // Disabled text styling
    disabled && "text-slate-400 bg-slate-50",
    // If there is a value or the input is focused, we need to add padding to the input to make it "look"
    // like the placeholder is in the input and they are both centered
    (focused || value) && "pt-7 pb-3",
    // Error Styling
    error
      ? "border-red-500"
      : disabled
        ? "border-slate-50"
        : focused
          ? "border-slate-200"
          : "border-slate-100",
    // Passed in input styles
    inputStyle,
  );

  const labelClasses = tw.style(
    // Label Sizing and Styling
    "absolute left-4 z-10 px-1",
    // If there is an error, make the label red
    error ? "text-red-500" : disabled ? "text-slate-300" : "text-slate-400",
  );

  return (
    <Pressable style={containerClasses} onPress={onContainerPress}>
      <TextInputWithNoFontScaling
        placeholder={placeholder}
        placeholderTextColor={"transparent"}
        ref={textInputRef}
        editable={!disabled}
        style={inputClasses}
        onChangeText={(text) => {
          onChangeText?.(text);
        }}
        value={value}
        onFocus={() => {
          // Animate the placeholder up on focus
          setIsFocused(true);
          animatePlaceholder(10, 12);
          // If there is an onFocus prop, call it
          // This allows us to pass an onFocus prop to this component,
          // while still being able to use the onFocus prop on the TextInput
          onFocus?.();
        }}
        onBlur={() => {
          // Animate the placeholder back down on blur
          setIsFocused(false);

          // If useValue is true AND there is no value, animate the placeholder back to the placeholder state
          if (!value) animatePlaceholder(20, 18);

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
        {error || placeholder}
      </Animated.Text>
    </Pressable>
  );
};

const AlternateTextInput: React.FC<TextInputProps> = ({
  placeholder,
  disabled,
  inputStyle,
  containerStyle,
  error,
  value,
  icon,
  onChangeText,
  onFocus,
  onBlur,
  ...props
}) => {
  // Create a ref to the text input so we can focus the input programmatically
  const textInputRef = useRef<RNTextInput>(null);

  // Focus the input when anywhere in the input container is pressed
  const onContainerPress = () => {
    textInputRef.current?.focus();
  };

  // Styling
  const containerClasses = tw.style(
    // Positioning and size
    "relative w-full -z-10 flex-row rounded-full bg-slate-100 items-center pr-4",
    // For icon styles
    icon && "pl-4",
    // Passed in container styles
    containerStyle,
  );

  const inputClasses = tw.style(
    // Input Sizing
    "py-4 text-base leading-5 px-4",
    // Icon styles
    icon && "pl-2",
    // Disabled text styling
    disabled && "text-slate-500",
    // Error Styling
    error
      ? "border-red-500"
      : disabled
        ? "border-slate-200"
        : "border-slate-400",
    // Passed in input styles
    inputStyle,
  );

  return (
    <Pressable style={containerClasses} onPress={onContainerPress}>
      {icon && (
        <RemixIcon name={icon} size={18} color={tw.color("slate-400")} />
      )}
      <TextInputWithNoFontScaling
        placeholder={placeholder}
        ref={textInputRef}
        editable={!disabled}
        style={inputClasses}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={tw.color("slate-300")}
        onFocus={() => {
          // If there is an onFocus prop, call it
          // This allows us to pass an onFocus prop to this component,
          // while still being able to use the onFocus prop on the TextInput
          onFocus?.();
        }}
        onBlur={() => {
          // If there is an onBlur prop, call it
          // This allows us to pass an onBlur prop to this component,
          // while still being able to use the onBlur prop on the TextInput
          onBlur?.();
        }}
        {...props}
      />
    </Pressable>
  );
};

export default TextInput;

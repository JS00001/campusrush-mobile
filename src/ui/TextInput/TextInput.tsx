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
  // ONLY CAN BE FALSE IF VARIANT IS "default"
  useValue?: boolean;
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
  useValue,
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
        useValue={useValue}
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
  useValue,
  onChangeText,
  onFocus,
  onBlur,
  ...props
}) => {
  // The current text in the input (This is for performance reasons)
  const [currentText, setCurrentText] = useState<string>(value || "");
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
      setIsFocused(true);
      animatePlaceholder(-8, 14);
    }
  }, []);

  // If the value prop changes, update the current text
  useEffect(() => {
    setCurrentText(value || "");

    // If the value prop is empty, animate the placeholder back to the placeholder state
    if (!value) animatePlaceholder(20, 18);
  }, [value]);

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

  const labelClasses = tw.style(
    // Label Sizing and Styling
    "absolute left-3 -z-10 bg-white px-1",
    // If there is an error, make the label red
    error ? "text-red-500" : disabled ? "text-slate-300" : "text-slate-500",
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
          // If the useValue prop is true, just call the onChangeText prop
          if (useValue) onChangeText?.(text);
          // Otherwise, set the current text (will not inform the parent component of the change until blur)
          else setCurrentText(text);
        }}
        value={
          // If the useValue prop is true, use the value prop
          // Otherwise, use the current text
          useValue ? value : currentText
        }
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

          // If useValue is true AND there is no value, animate the placeholder back to the placeholder state
          if (useValue && !value) animatePlaceholder(20, 18);
          // If useValue is false AND there is no current text, animate the placeholder back to the placeholder state
          else if (!useValue && !currentText) animatePlaceholder(20, 18);

          // If useValue is false and there is current text, call the onChangeText prop
          if (!useValue && currentText) onChangeText?.(currentText);

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

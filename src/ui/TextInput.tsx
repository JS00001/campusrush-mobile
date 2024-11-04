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
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { useRef } from "react";

import tw from "@/lib/tailwind";
import Icon, { IconType } from "@/ui/Icon";

// This is a hack to disable font scaling for all text input components
export const TextInputWithNoFontScaling = Object.assign(RNTextInput, {
  defaultProps: {
    ...(RNTextInput as any).defaultProps,
    allowFontScaling: false,
  },
});

interface TextInputProps extends RNTextInputProps {
  placeholder: string;
  style?: any;
  contentContainerStyle?: any;
  icon?: IconType;
  error?: string;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  disabled,
  style,
  contentContainerStyle,
  icon,
  error,
  value,
  onFocus,
  onBlur,
  onChangeText,
  ...props
}) => {
  const inputRef = useRef<RNTextInput>(null);

  /**
   * When the container is pressed, focus the input (this is a hack
   * to make the entire container pressable)
   */
  const onContainerPress = () => {
    inputRef.current?.focus();
  };

  const containerStyles = tw.style(
    "relative w-full -z-10 flex-row rounded-full bg-gray-100 items-center pr-4",
    icon && "pl-4",
    disabled && "disabled",
    contentContainerStyle,
  );

  const inputStyles = tw.style(
    "py-4 text-base leading-5 px-4",
    icon && "pl-2",
    error && "border-red",
    !error && "border-gray-100",
    style,
  );

  return (
    <Pressable style={containerStyles} onPress={onContainerPress}>
      {icon && <Icon name={icon} size={18} color={tw.color("gray-400")} />}

      <TextInputWithNoFontScaling
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={tw.color("gray-300")}
        editable={!disabled}
        style={inputStyles}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    </Pressable>
  );
};

export default TextInput;

/*
 * Created on Thu Oct 5 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useRef, useState } from "react";
import { View, Pressable, TextInput as RNTextInput } from "react-native";

import tw from "@/lib/tailwind";
import IconButton from "@/ui/IconButton";
import { TextInputWithNoFontScaling } from "@/ui/TextInput/TextInput";

interface MessageBoxProps {
  onSend: (message: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ onSend }) => {
  // The message value that is to be sent
  const [value, setValue] = useState<string>("");
  // Whether or not the send button should be disabled (if there is no message)
  const isButtonDisabled = value.length === 0;

  // When the send button is pressed, send the message
  const onSendPress = () => {
    // Call the onSend callback if it exists
    onSend(value);
    // Clear the message value
    setValue("");
  };

  // Styling
  const containerClasses = tw.style(
    // Positioning and size
    "flex-row gap-1 px-6 py-2 border-t items-center",
    // Coloring
    "border-slate-100 ",
  );

  return (
    <View style={containerClasses}>
      <MessagingTextInput
        placeholder="Send a message"
        value={value}
        onChangeText={setValue}
      />
      <IconButton
        size="md"
        icon="ri-send-plane-2-line"
        disabled={isButtonDisabled}
        onPress={onSendPress}
      />
    </View>
  );
};

interface MessagingTextInputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
}

const MessagingTextInput: React.FC<MessagingTextInputProps> = ({
  value,
  placeholder,
  onChangeText,
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
    "relative w-full -z-10 flex-row rounded-xl bg-slate-100 items-center pr-4",
    // Allow the input to shrink when the container is too small, (more content on one line)
    "flex-shrink",
  );

  const inputClasses = tw.style(
    // Input Sizing
    "py-3 text-base leading-5 px-5 max-h-40",
  );

  return (
    <Pressable style={containerClasses} onPress={onContainerPress}>
      <TextInputWithNoFontScaling
        multiline
        value={value}
        ref={textInputRef}
        returnKeyType="done"
        blurOnSubmit={true}
        style={inputClasses}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={tw.color("slate-300")}
        {...props}
      />
    </Pressable>
  );
};

export default MessageBox;

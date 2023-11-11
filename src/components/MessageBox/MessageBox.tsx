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

import {
  View,
  Pressable,
  TextInput as RNTextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import IconButton from "@/ui/IconButton";
import AppConstants from "@/constants";
import Walkthroughs from "@/components/Walkthroughs";
import { usePreferences } from "@/providers/Preferences";
import { TextInputWithNoFontScaling } from "@/ui/TextInput/TextInput";

interface MessageBoxProps {
  onSend: (message: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ onSend }) => {
  // The message value that is to be sent
  const [value, setValue] = useState<string>("");
  // The preferences
  const { messagingTooltipSeen, updatePreferences } = usePreferences();
  // Whether or not the send button should be disabled (if there is no message)
  const isButtonDisabled = value.length === 0;

  // When the send button is pressed, send the message
  const onSendPress = () => {
    // Call the onSend callback if it exists
    onSend(value);
    // Clear the message value
    setValue("");
  };

  // When the walkthrough is closed, update the preferences
  const onWalkthroughClose = () => {
    updatePreferences({ messagingTooltipSeen: true });
  };

  // Styling
  const containerClasses = tw.style(
    // Positioning and size
    "flex-row gap-1 px-3 py-2 border-t items-center",
    // Coloring
    "border-slate-100 ",
  );

  return (
    <Walkthroughs.MessageBoxWalkthrough
      onClose={onWalkthroughClose}
      isVisible={!messagingTooltipSeen}
    >
      <CommandAutocomplete value={value} setValue={setValue} />
      <View style={containerClasses}>
        {/* TODO: Add events */}
        <IconButton
          size="md"
          icon="ri-calendar-event-line"
          onPress={() => {}}
          disabled
        />
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
    </Walkthroughs.MessageBoxWalkthrough>
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
  // List of formatted text
  const [formattedText, setFormattedText] = useState([]);

  // Focus the input when anywhere in the input container is pressed
  const onContainerPress = () => {
    textInputRef.current?.focus();
  };

  const _onChangeText = (text: string) => {
    // Run the onChangeText callback
    onChangeText(text);

    // Extract the words from the text
    const words = text.split(" ");
    // Create a list of formatted words
    const formattedWords: any = [];
    // Create a list of messaging keywords alone
    const messagingKeywords = AppConstants.messagingKeywords.map(
      (keyword) => keyword.keyword,
    );

    // For each word, check if it is a keyword, if it is, update the style
    words.forEach((word, index) => {
      if (messagingKeywords.includes(word)) {
        formattedWords.push(
          <Text
            key={word + index}
            style={tw.style(" text-blue-600 font-semibold text-base ")}
          >
            {word}
          </Text>,
        );
      } else {
        formattedWords.push(word);
      }

      // Add a space after every word except the last one
      if (index < words.length - 1) {
        formattedWords.push(" ");
      }
    });

    // Update the state with formatted text
    setFormattedText(formattedWords);
  };

  // Update the formatted text when the value changes
  // This is because we update the value when the user selects a keyword
  useEffect(() => {
    _onChangeText(value);
  }, [value]);

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
        // value={value}
        ref={textInputRef}
        returnKeyType="done"
        blurOnSubmit={true}
        style={inputClasses}
        placeholder={placeholder}
        onChangeText={_onChangeText}
        placeholderTextColor={tw.color("slate-300")}
        {...props}
      >
        <Text style={tw.style("text-base leading-5 text-primary")}>
          {formattedText.map((word) => {
            return word;
          })}
        </Text>
      </TextInputWithNoFontScaling>
    </Pressable>
  );
};

interface CommandAutocompleteProps {
  value?: string;
  setValue?: (value: string) => void;
}

const CommandAutocomplete: React.FC<CommandAutocompleteProps> = ({
  value,
  setValue,
}) => {
  // The list of keywords to show
  const messagingKeywords = AppConstants.messagingKeywords;
  // State for filtered keywords
  const [keywords, setKeywords] = useState([] as any);

  // Pull the last word typed, if it starts with an @, search & filter the keywords
  useEffect(() => {
    // Get the last word typed
    const lastWord = value?.split(" ").pop();

    if (lastWord?.startsWith("@")) {
      // Check if lastWord is just an @, if it is, show all keywords
      if (lastWord === "@") {
        setKeywords(messagingKeywords);
        return;
      }

      // Get the keywords that start with the last word
      const filteredKeywords = messagingKeywords.filter((keyword) => {
        return keyword.keyword.startsWith(lastWord);
      });

      // Update the filtered keywords
      setKeywords(filteredKeywords);
    } else {
      // If there is no @, hide the keywords
      setKeywords([]);
    }
  }, [value]);

  const onKeywordPress = (keyword: string) => {
    // Get the words in the message
    const words = value?.split(" ");
    // Replace the last word with the keyword
    words?.pop();
    words?.push(keyword);
    // Join the words back together
    const message = words?.join(" ") + " ";

    if (message) {
      // Update the message value
      setValue?.(message);
      // Hide the keywords
      setKeywords([]);
    }
  };

  // Styling
  const containerStyles = tw.style(
    // Default styling
    "max-h-48 w-full border-t border-slate-100",
    // Hide the container if there are no keywords
    keywords.length === 0 && "hidden",
  );

  return (
    <ScrollView
      style={containerStyles}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    >
      {keywords.map((keyword: any, i: any) => (
        <TouchableOpacity
          key={keyword.keyword + i}
          style={tw`px-4 border-b border-slate-100 py-3`}
          onPress={() => onKeywordPress(keyword.keyword)}
        >
          <Text variant="body" style={tw`text-primary font-semibold`}>
            {keyword.keyword}
          </Text>
          <Text>{keyword.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default MessageBox;

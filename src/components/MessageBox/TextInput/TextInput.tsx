/*
 * Created on Mon Dec 25 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */
import { Pressable, TextInput as RNTextInput } from "react-native";
import { useState, useEffect, RefObject } from "react";

import Text from "@/ui_v1/Text";
import tw from "@/lib/tailwind";
import AppConstants from "@/constants";
import { TextInputWithNoFontScaling } from "@/ui_v1/TextInput/TextInput";

interface TextInputProps {
  value: string;
  placeholder: string;
  passedRef: RefObject<RNTextInput>;
  setValue: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  placeholder,
  passedRef,
  setValue,
}) => {
  const [formattedText, setFormattedText] = useState([]);

  // Focus the input when anywhere in the input container is pressed
  const onContainerPress = () => {
    passedRef.current?.focus();
  };

  const onChangeText = (text: string, updateValue: boolean = true) => {
    // This prevents an infinite loop when the value is updated
    if (updateValue) {
      setValue(text);
    }

    const words = text.split(" ");

    const keywords = AppConstants.messagingKeywords.map(
      (keyword) => keyword.keyword,
    );

    const keywordStyles = tw.style("text-blue-600 font-semibold text-base");

    const formattedWords: any = [];

    // For each word, check if it is a keyword, if it is, update the style
    words.forEach((word, index) => {
      if (keywords.includes(word)) {
        // prettier-ignore
        const element =  <Text key={index} style={keywordStyles} children={word} />
        formattedWords.push(element);
      } else {
        formattedWords.push(word);
      }

      // Add a space after every word except the last one
      if (index < words.length - 1) {
        formattedWords.push(" ");
      }
    });

    setFormattedText(formattedWords);
  };

  // Update the formatted text when the value changes
  // This is because we update the value when the user selects a keyword
  useEffect(() => {
    onChangeText(value, false);
  }, [value]);

  // Styling
  const containerClasses = tw.style(
    "relative w-full -z-10 flex-row rounded-xl bg-slate-100 items-center pr-4",
    // Allow the input to shrink when the container is too small, (more content on one line)
    "flex-shrink",
  );

  const inputClasses = tw.style("py-3 text-base leading-5 px-5 max-h-40");

  return (
    <Pressable style={containerClasses} onPress={onContainerPress}>
      <TextInputWithNoFontScaling
        multiline
        ref={passedRef}
        returnKeyType="done"
        blurOnSubmit={true}
        style={inputClasses}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={tw.color("slate-300")}
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

export default TextInput;

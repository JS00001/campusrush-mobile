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

import { useState, useEffect } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface TextSuggestionsProps {
  value: string;
  suggestions: Suggestion[];
  setValue: (value: string) => void;
}

const TextSuggestions: React.FC<TextSuggestionsProps> = ({
  value,
  suggestions,
  setValue,
}) => {
  // State for filtered keywords
  const [keywords, setKeywords] = useState([] as any);

  // Pull the last word typed, if it starts with an @, search & filter the keywords
  useEffect(() => {
    const lastWord = value?.split(" ").pop();

    if (lastWord?.startsWith("@")) {
      if (lastWord === "@") {
        setKeywords(suggestions);
        return;
      }

      // Get the keywords that start with the last word
      const filteredKeywords = suggestions.filter((suggestion) => {
        return suggestion.keyword.startsWith(lastWord);
      });

      // Update the filtered keywords
      setKeywords(filteredKeywords);
    } else {
      // If there is no @, hide the keywords
      setKeywords([]);
    }
  }, [value]);

  const onKeywordPress = (keyword: string) => {
    const words = value?.split(" ");

    // Replace the last word with the keyword
    words?.pop();
    words?.push(keyword);

    // Join the words back together
    const message = words?.join(" ") + " ";

    if (message) {
      setValue?.(message);
      // Hide the keywords once a keyword is selected
      setKeywords([]);
    }
  };

  const containerStyles = tw.style(
    "max-h-48 w-full border-t border-slate-100",
    // Hide the container if there are no keywords
    keywords.length === 0 && "hidden",
  );

  return (
    <ScrollView style={containerStyles} keyboardShouldPersistTaps="always">
      {keywords.map((suggestion: Suggestion, index: number) => {
        const onPress = () => {
          onKeywordPress(suggestion.keyword);
        };

        return (
          <TouchableOpacity
            key={index}
            style={tw`px-4 border-b border-slate-100 py-3`}
            onPress={onPress}
          >
            <Text variant="body" style={tw`text-primary font-semibold`}>
              {suggestion.keyword}
            </Text>
            <Text>{suggestion.description}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default TextSuggestions;

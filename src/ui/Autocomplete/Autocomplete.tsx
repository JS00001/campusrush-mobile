/*
 * Created on Tue Aug 15 2023
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
  ScrollView,
  TouchableOpacity,
  TextInputProps as RNTextInputProps,
} from "react-native";
import { useEffect, useState } from "react";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import TextInput from "@/ui/TextInput";

interface AutocompleteProps extends RNTextInputProps {
  placeholder: string;
  options: string[];
  value?: string;
  error?: string;
  onChangeText?: (value: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  placeholder,
  options,
  value,
  error,
  onChangeText,
  ...props
}) => {
  // Whether to show the dropdown or not
  const [focused, setFocused] = useState(false);

  // Filtered options to show in the dropdown
  const [filteredOptions, setFilteredOptions] = useState(options);

  // This is essentially the 'onChangeText' function
  const filterOptions = (value: string) => {
    // Call the onChangeText function passed in as a prop
    // This should update the value (if the value prop is not undefined)
    onChangeText?.(value);

    // Ensure that the dropdown is visible
    setFocused(true);

    // Update the visible options to only include those that match the value
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  // When an option is selected, update the value and hide the dropdown
  const handleOptionSelect = (option: string) => {
    onChangeText?.(option);
    setFocused(false);
  };

  // When the input is focused, show the dropdown
  const handleFocus = () => {
    setFocused(true);
  };

  // When the input is blurred, hide the dropdown
  const handleBlur = () => {
    setFocused(false);
  };

  // Styling
  const dropdownViewClasses = tw.style(
    // Positioning and size
    `absolute top-18 rounded-md border w-full max-h-48 py-2 z-30`,
    // Styling
    `bg-white border-slate-400`,
    // Whether to show the dropdown or not
    !focused && "hidden",
  );

  return (
    <>
      <TextInput
        {...props}
        placeholder={placeholder}
        value={value}
        onChangeText={filterOptions}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={error}
      />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={dropdownViewClasses}
      >
        <View>
          {filteredOptions.length === 0 && (
            <Text style={tw`text-slate-500 px-4 py-3`}>No results found</Text>
          )}

          {filteredOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={tw.style("px-4 py-2")}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={tw`text-slate-500`}>
                {value && option.toLowerCase().includes(value.toLowerCase()) ? (
                  <>
                    {option.slice(
                      0,
                      option.toLowerCase().indexOf(value.toLowerCase()),
                    )}
                    <Text style={tw`text-black font-medium`}>
                      {option.slice(
                        option.toLowerCase().indexOf(value.toLowerCase()),
                        option.toLowerCase().indexOf(value.toLowerCase()) +
                          value.length,
                      )}
                    </Text>
                    {option.slice(
                      option.toLowerCase().indexOf(value.toLowerCase()) +
                        value.length,
                    )}
                  </>
                ) : (
                  option
                )}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Autocomplete;

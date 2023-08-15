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
  TextInputProps as RNTextInputProps,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";

import TextInput from "@/ui/TextInput";
import { useState } from "react";
import tw from "@/lib/tailwind";
import Text from "../Text";

interface AutocompleteProps extends RNTextInputProps {
  placeholder: string;
  options: string[];
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  placeholder,
  options,
}) => {
  const [value, setValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);

  const filterOptions = (value: string) => {
    setValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={filterOptions}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={tw`absolute top-18 rounded-md bg-white border border-slate-400 w-full max-h-48 z-10`}
      >
        <View style={tw`flex flex-col`}>
          {filteredOptions.length === 0 && (
            <View style={tw`px-4 py-3 bg-slate-100`}>
              <Text style={tw`text-slate-500`}>No results found</Text>
            </View>
          )}

          {filteredOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={tw.style(
                `px-4 py-3`,
                index % 2 === 0 ? "bg-slate-100" : "bg-white",
              )}
              onPress={() => {
                setValue(option);
              }}
            >
              <Text style={tw`text-slate-500`}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Autocomplete;

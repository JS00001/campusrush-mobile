/*
 * Created on Sat Nov 11 2023
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
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import RemixIcon from "react-native-remix-icon";
import { useEffect, useRef, useState } from "react";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface DropdownProps {
  options: string[];
  placeholder: string;
  error?: string;
  value?: string;
  hideLabel?: boolean;
  style?: any;
  searchable?: boolean;
  onValueChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  options,
  value,
  error,
  style,
  hideLabel = false,
  searchable = false,
  onValueChange,
}) => {
  // Store the dropdowns position
  const [yPos, setYPos] = useState(0);
  // Whether or not the dropdown is expanded
  const [expanded, setExpanded] = useState(false);

  // The search query to filter the options by
  const [filterQuery, setFilterQuery] = useState("");
  // Filtered options to show in the dropdown
  const [filteredOptions, setFilteredOptions] = useState(options);

  // Create a ref for the dropdowns button
  const dropdownRef = useRef<TouchableOpacity>(null);

  // The icon to show, based on whether the dropdown is expanded or not
  const iconName = expanded ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line";

  // Show the value if there is one, otherwise show the placeholder with "Select" prepended
  const valueText = value ? value : `Select ${placeholder}`;

  // On the first load, calculate the dropdowns position
  useEffect(() => {
    if (dropdownRef.current) {
      dropdownRef.current.measure((x, y, width, height, pageX, pageY) => {
        setYPos(pageY);
      });
    }
  }, []);

  // This is the search box's onChange handler
  const onChangeFilterText = (value: string) => {
    setFilterQuery(value);

    // Update the visible options to only include those that match the value
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().startsWith(value.toLowerCase()),
      ),
    );
  };

  // Set the dropdown to the opposite of what it currently is
  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  // The components root container's classes
  const containerClasses = tw.style("gap-2 w-full", style);

  // The dropdown button's classes
  const dropdownClasses = tw.style(
    "flex-row justify-between items-center p-4.5 bg-slate-100 rounded-xl",
    error ? "border border-red" : "border border-slate-100",
  );

  // The modal backdrop's classes
  const modalBackdropClasses = tw`w-full h-full items-center px-6`;

  // The modal content's (the list of options) classes
  const modalContentClasses = tw.style(
    `bg-slate-100 rounded-lg w-full max-h-52 py-1 gap-y-1 `,
    {
      // Offset the modal by the dropdowns position
      top: yPos + 70,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: {
        height: 2,
        width: 0,
      },
    },
  );

  // The search box's classes
  const searchBoxClasses = tw`px-4.5 py-3 border-b border-slate-200 text-lg leading-5`;

  return (
    <View style={containerClasses}>
      {/* The label for the dropdown, if it exists */}
      {!hideLabel && (
        <Text style={tw`text-primary font-medium`}>{placeholder}</Text>
      )}

      {/* The button to open the dropdown */}
      <TouchableOpacity
        ref={dropdownRef}
        style={dropdownClasses}
        onPress={toggleExpanded}
      >
        <Text
          numberOfLines={1}
          variant="title"
          style={tw.style("font-medium", error && "text-red", "shrink")}
        >
          {valueText}
        </Text>
        <RemixIcon name={iconName} color={tw.color("primary")} />
      </TouchableOpacity>

      {/* The error, if it exists */}
      {error && <Text style={tw`text-red`}>{error}</Text>}

      {/* The dropdown list of options */}
      <Modal
        transparent
        animationType="none"
        visible={expanded}
        onRequestClose={toggleExpanded}
      >
        {/* The modal dropdowns backdrop, when pressed, close the overlay */}
        <TouchableWithoutFeedback onPress={toggleExpanded}>
          <View style={modalBackdropClasses}>
            <View style={modalContentClasses}>
              {/* If the dropdown is searchable, show a search box */}
              {(searchable || options.length < 1) && (
                <TextInput
                  autoComplete="off"
                  autoCorrect={false}
                  value={filterQuery}
                  style={searchBoxClasses}
                  onChangeText={onChangeFilterText}
                  placeholderTextColor={tw.color("slate-400")}
                  placeholder={`Search ${options.length} options`}
                />
              )}

              {/* The list of options */}
              <FlatList
                data={filteredOptions}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={
                  // If there are no results found, show a message
                  // prettier-ignore
                  <Text variant="title" style={tw`px-4.5 py-3 text-primary font-normal`}>
                    No results found
                  </Text>
                }
                renderItem={({ item, index }) => (
                  <DropdownOption
                    option={item}
                    selected={item === value}
                    onPress={(option) => {
                      onValueChange?.(option);
                      toggleExpanded();
                    }}
                  />
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

interface DropdownOptionProps {
  option: string;
  selected?: boolean;
  onPress: (option: string) => void;
}

export const DropdownOption: React.FC<DropdownOptionProps> = ({
  option,
  selected,
  onPress,
}) => {
  // When the option is pressed, call the onPress handler with the option
  const onOptionPress = () => onPress(option);

  const containerClasses = tw.style("px-1");

  const contentContainerClasses = tw.style(
    "py-3 px-4.5 rounded-md",
    selected && "bg-slate-200",
  );

  const textClasses = tw.style(
    "text-primary",
    selected ? "font-medium" : "font-normal",
  );

  return (
    <TouchableOpacity style={containerClasses} onPress={onOptionPress}>
      <View style={contentContainerClasses}>
        <Text style={textClasses} variant="title">
          {option}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Dropdown;

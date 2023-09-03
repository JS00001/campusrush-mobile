/*
 * Created on Sun Sep 03 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { debounce } from "lodash";
import { useMemo, useRef, useState } from "react";
import { View, TouchableOpacity, SectionList } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import ListItem from "@/ui/ListItem";

interface PnmsListProps {
  pnms: PNM[];
}

const PnmsList: React.FC<PnmsListProps> = ({ pnms }) => {
  // Create a ref to the sectionlist so we can scroll to a specific index programatically
  const sectionListRef = useRef<SectionList>(null);
  // Store the current letter from the alphabet list
  const [currentLetter, setCurrentLetter] = useState("A");
  // Whether or not the list is scrolling, used to prevent the alphabet list from changing the current letter
  const [isScrolling, setIsScrolling] = useState(false);

  // When pnms change, create a new list like this
  // [ {title: "A", data: {pnms starting with A}}, {title: "B", data: {pnms starting with B}}, ...}}]
  // Only have an entry if there are pnms with that letter first name
  // Memoize so it only updates when pnms change
  const data = useMemo(() => {
    // Reduce the pnms to an object with keys of the first letter of the first name
    const reduction = pnms.reduce(
      (acc, pnm) => {
        // Get the first letter of the first name
        const firstLetter = pnm.firstName[0].toUpperCase();

        // If the accumulator does not have an entry for that letter, create one
        if (!acc[firstLetter]) {
          acc[firstLetter] = {
            title: firstLetter,
            data: [],
          };
        }
        // Add the pnm to that letter's data
        acc[firstLetter].data.push(pnm);

        // Return the accumulator
        return acc;
      },
      {} as Record<string, { title: string; data: PNM[] }>,
    );

    // Convert the object to an array and return it
    return Object.values(reduction);
  }, [pnms]);

  // When the current letter changes, scroll to the section with that letter
  // If the letter is not found, find the closest letter
  const onLetterChange = (letter: string) => {
    // Set the current letter
    setCurrentLetter(letter);

    // Get the index of the section with that letter
    const index = data.findIndex((section) => section.title === letter);

    // If the letter is not found, find the closest letter
    if (index === -1) {
      // Get the index of the closest letter
      const closestIndex = data.findIndex((section) => {
        // Get the first letter of the section title
        const firstLetter = section.title[0];

        // If the current letter is less than the first letter, return true
        return letter < firstLetter;
      });

      // Scroll to the closest letter
      sectionListRef.current?.scrollToLocation({
        sectionIndex: closestIndex,
        // We use 1 because this WILL NOT WORK if we use 0
        // Using 0 scrolls to "A" all the time (not sure why)
        itemIndex: 1,
      });
    } else {
      // Scroll to the letter index
      sectionListRef.current?.scrollToLocation({
        sectionIndex: index,
        // We use 1 because this WILL NOT WORK if we use 0
        // Using 0 scrolls to "A" all the time (not sure why)
        itemIndex: 1,
      });
    }
  };

  // When the viewable items change, get the first item and set the current letter to the first letter of the first item
  const onViewableItemsChanged = debounce((info) => {
    // Get the first item
    const firstItem = info.viewableItems[0];

    // If there is a first item, set the current letter to the section title
    // The section title is the first letter of the first name
    if (firstItem) {
      setCurrentLetter(firstItem.section.title);
    }

    // Set is scrolling to false
    setIsScrolling(false);
  }, 100);

  // When the list is scrolling, set is scrolling to true
  const handleScroll = () => {
    if (!isScrolling) {
      setIsScrolling(true);
    }
  };

  const renderItem = ({ item: pnm }: { item: PNM }) => (
    <ListItem
      key={pnm._id}
      title={`${pnm.firstName} ${pnm.lastName}`}
      subtitle={pnm.phoneNumber}
    />
  );

  const ListEmptyComponent = () => {
    return new Array(20)
      .fill(0)
      .map((_, i) => (
        <ListItem key={i} title="" subtitle="" loading pressable={false} />
      ));
  };

  return (
    <View style={tw`flex-row h-full gap-x-2`}>
      {/* The contacts */}
      <SectionList
        sections={data}
        ref={sectionListRef}
        onScroll={handleScroll}
        contentContainerStyle={tw`gap-y-2`}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        // If there is no data, it is probably loading so show skeletons
        ListEmptyComponent={ListEmptyComponent}
        // When the viewable items change, this updates the current letter
        onViewableItemsChanged={onViewableItemsChanged}
        // The viewability config is set to 100% so that the section header is visible when the first item is fully visible
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
        // Create a header for each letter
        renderSectionHeader={({ section: { title } }) => (
          <Text style={tw`text-slate-400 bg-white w-full font-medium`}>
            {title}
          </Text>
        )}
      />

      {/* The alphabet list to sort contacts */}
      <AlphabetList
        currentLetter={currentLetter}
        setCurrentLetter={onLetterChange}
      />
    </View>
  );
};

interface AlphabetListProps {
  currentLetter?: string;
  setCurrentLetter?: (letter: string) => void;
}

const AlphabetList: React.FC<AlphabetListProps> = ({
  currentLetter,
  setCurrentLetter = () => {},
}) => {
  // All letters in the alphabet
  const alphabetChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <View style={tw`mb-6`}>
      <View
        style={tw`bg-slate-100 rounded-full justify-between h-full py-1 items-center`}
      >
        {alphabetChars.map((char, i) => {
          // Stlying
          const textClasses = tw.style(
            // If not the selected letter, make it a light gray
            "text-slate-400",
            // If the selected letter, make it a dark blue
            currentLetter === char && "text-primary font-medium",
          );

          const containerClasses = tw.style("w-full items-center px-1");

          // On press, set the current letter
          const handlePress = () => {
            setCurrentLetter(char);
          };

          return (
            <TouchableOpacity
              key={i}
              onPress={handlePress}
              style={containerClasses}
            >
              <Text variant="subtext" style={textClasses}>
                {char}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default PnmsList;

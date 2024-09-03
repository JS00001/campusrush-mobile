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
/*
 * Created on Sun Feb 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { FlatList, View } from "react-native";
import { useCallback, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Option from "./Option";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import useSearch from "@/hooks/useSearch";
import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import useKeyboardListener from "@/hooks/useKeyboardListener";

interface OptionSheetProps {
  placeholder: string;
  searchable: boolean;
  value: string | null;
  options: string[];
  innerRef: React.RefObject<BottomSheetModal>;
  handleCloseSheet: () => void;
  onChange: (value: string | null) => void;
}

const OptionSheet: React.FC<OptionSheetProps> = ({
  placeholder,
  searchable,
  value,
  options,
  innerRef,
  onChange,
  handleCloseSheet,
}) => {
  useKeyboardListener({
    onKeyboardWillShow: () => {
      innerRef.current?.snapToPosition("95%");
    },
    onKeyboardWillHide: () => {
      innerRef.current?.snapToIndex(0);
    },
  });

  const [selected, setSelected] = useState(value);
  const search = useSearch({
    data: options,
  });

  const handleSheetChanges = (index: number) => {
    // When the sheet closes...
    if (index === -1) {
      search.setQuery("");
      handleCloseSheet();
      setSelected(value);
    }
  };

  const onDonePress = () => {
    onChange(selected);
    handleCloseSheet();
  };

  const inputPlaceholder = `Search ${options.length || ""} options`;

  const containerStyles = tw.style("px-0 gap-3");

  return (
    <BottomSheet innerRef={innerRef} onChange={handleSheetChanges}>
      <BottomSheetContainer style={containerStyles} disableScroll>
        <View style={tw`px-6 gap-3`}>
          <Text type="h1">{placeholder}</Text>
          {searchable && (
            <TextInput
              placeholder={inputPlaceholder}
              value={search.query}
              onChangeText={search.setQuery}
            />
          )}
        </View>

        <FlatList
          data={search.data}
          style={tw`max-h-64`}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <Text type="h3" style={tw`px-4.5 py-3 font-normal`}>
              No results found
            </Text>
          }
          renderItem={({ item, index }) => {
            const isSelected = selected === item;

            const handleOptionPress = () => {
              setSelected(item);
            };

            return (
              <Option
                value={item}
                key={index}
                selected={isSelected}
                onPress={handleOptionPress}
              />
            );
          }}
        />

        <View style={tw`px-6`}>
          <Button size="sm" onPress={onDonePress}>
            Done
          </Button>
        </View>
      </BottomSheetContainer>
    </BottomSheet>
  );
};

export default OptionSheet;

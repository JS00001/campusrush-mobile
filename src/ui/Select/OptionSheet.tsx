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

import { useState } from "react";
import { FlatList, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import Option from "./Option";

import type { ISelectOption } from "./@types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Searchbox from "@/ui/Searchbox";
import useSearch from "@/hooks/useSearch";
import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import useKeyboardListener from "@/hooks/useKeyboardListener";

interface OptionSheetProps<T = any> {
  placeholder: string;
  searchable: boolean;
  options: ISelectOption<T>[];
  value: string | null;
  innerRef: React.RefObject<BottomSheetModal>;
  closeSheet: () => void;
  onChange: (value: string) => void;
}

const OptionSheet: React.FC<OptionSheetProps> = ({
  placeholder,
  searchable,
  value,
  options,
  innerRef,
  onChange,
  closeSheet,
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
    fields: ["label"],
  });

  const handleSheetChanges = (index: number) => {
    // When the sheet closes...
    if (index === -1) {
      search.setQuery("");
      closeSheet();
      setSelected(value);
    }
  };

  const onDonePress = () => {
    if (!selected) return;
    onChange(selected);
    closeSheet();
  };

  const inputPlaceholder = `Search ${options.length || ""} options`;

  const containerStyles = tw.style("px-0 gap-3");

  return (
    <BottomSheet innerRef={innerRef} onChange={handleSheetChanges}>
      <BottomSheetContainer style={containerStyles} disableScroll>
        <View style={tw`px-6 gap-3`}>
          <Text type="h1">{placeholder}</Text>
          {searchable && (
            <Searchbox
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
            <Text type="h4" style={tw`px-4.5 py-3 font-normal`}>
              No results found
            </Text>
          }
          renderItem={({ item, index }) => (
            <Option
              key={index}
              value={item.label}
              disabled={item.disabled}
              selected={selected === item.value}
              onPress={() => setSelected(item.value)}
            />
          )}
        />

        <View style={tw`px-6`}>
          <Button onPress={onDonePress}>Done</Button>
        </View>
      </BottomSheetContainer>
    </BottomSheet>
  );
};

export default OptionSheet;

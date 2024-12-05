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

import * as Haptic from "expo-haptics";
import { useRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { TouchableOpacity, ViewProps } from "react-native";

import { ISelectOption } from "./@types";
import type { IconType } from "@/constants/icons";

import OptionSheet from "./OptionSheet";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";

interface SelectProps<T = any> extends ViewProps {
  /** The placeholder when no item is selected */
  placeholder: string;
  /** This value should be unique. Its the value of the select */
  value: string | null;
  /** The options to select from */
  options: ISelectOption<T>[];
  /** If the select is searchable */
  searchable?: boolean;
  /** The error message to display */
  error?: string;
  /** The style of the select */
  style?: any;
  /** The function to call when the value changes */
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  searchable,
  error,
  value,
  style,
  onChange,
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [expanded, setExpanded] = useState(false);

  const label = options.find((o) => o.value === value)?.label;
  const iconName: IconType = expanded ? "CaretUp" : "CaretDown";
  const valueText = label || `Select ${placeholder}`;

  const toggleExpanded = () => {
    if (expanded) {
      closeSheet();
      return;
    }

    handleOpenSheet();
  };

  const handleOpenSheet = () => {
    setExpanded(true);
    Haptic.selectionAsync();
    sheetRef.current?.present();
  };

  const closeSheet = () => {
    setExpanded(false);
    sheetRef.current?.dismiss();
  };

  const selectStyles = tw.style(
    "border bg-gray-100 rounded-xl py-4 px-6 w-full",
    "flex-row justify-between items-center",
    error && "border-red-500",
    !error && "border-gray-100",
    style,
  );

  const textStyles = tw.style(
    "text-base",
    error && "text-red-500",
    !value && !error && "text-gray-500",
    value && !error && "text-primary",
  );

  return (
    <>
      <TouchableOpacity style={selectStyles} onPress={toggleExpanded}>
        <Text numberOfLines={1} style={textStyles}>
          {valueText}
        </Text>
        <Icon icon={iconName} size={16} color={tw.color("primary")} />
      </TouchableOpacity>

      <OptionSheet
        innerRef={sheetRef}
        value={value}
        options={options}
        searchable={!!searchable}
        placeholder={placeholder}
        closeSheet={closeSheet}
        onChange={onChange}
      />
    </>
  );
};

export default Select;

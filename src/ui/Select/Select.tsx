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
import { TouchableOpacity, View, ViewProps } from "react-native";

import type { IconType } from "@/constants/icons";

import OptionSheet from "./OptionSheet";

import Text from "@/ui/Text";
import Icon from "@/ui/Icon";
import tw from "@/lib/tailwind";

interface SelectProps extends ViewProps {
  options: string[];
  placeholder: string;
  value: string | null;
  searchable?: boolean;
  error?: string;
  style?: any;
  onChange: (value: string | null) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder,
  searchable,
  error,
  value,
  style,
  onChange,
  ...props
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [expanded, setExpanded] = useState(false);

  const valueText = value || `Select ${placeholder}`;
  const iconName: IconType = expanded ? "CaretUp" : "CaretDown";

  const toggleExpanded = () => {
    if (expanded) {
      handleCloseSheet();
      return;
    }

    handleOpenSheet();
  };

  const handleOpenSheet = () => {
    setExpanded(true);
    Haptic.selectionAsync();
    sheetRef.current?.present();
  };

  const handleCloseSheet = () => {
    setExpanded(false);
    sheetRef.current?.dismiss();
  };

  const containerStyles = tw.style("gap-2 w-full", style);

  const selectStyles = tw.style(
    "border bg-gray-100 rounded-xl p-4.5",
    "flex-row justify-between items-center",
    error && "border-red-500",
    !error && "border-gray-100",
  );

  const textStyles = tw.style(
    "font-medium",
    error && "text-red-500",
    !error && "text-primary",
  );

  return (
    <>
      <View style={containerStyles} {...props}>
        <Text style={textStyles}>{error || placeholder}</Text>

        <TouchableOpacity style={selectStyles} onPress={toggleExpanded}>
          <Text numberOfLines={1} type="h4" style={textStyles}>
            {valueText}
          </Text>
          <Icon icon={iconName} color={tw.color("primary")} />
        </TouchableOpacity>
      </View>

      <OptionSheet
        searchable={!!searchable}
        innerRef={sheetRef}
        value={value}
        options={options}
        placeholder={placeholder}
        onChange={onChange}
        handleCloseSheet={handleCloseSheet}
      />
    </>
  );
};

export default Select;

/*
 * Created on Tue Nov 14 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import RemixIcon from "react-native-remix-icon";
import { View, TouchableOpacity } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";

interface CopyItemProps {
  value: string;
  label?: string;
}

const CopyItem: React.FC<CopyItemProps> = ({ value, label }) => {
  const containerClasses = tw.style(
    "flex-row items-center justify-between bg-slate-100 w-full rounded-md gap-x-2",
    label && "px-4.5 pb-4.5 pt-4",
    !label && "py-2 pl-4.5 pr-2",
  );

  const iconContainerClasses = tw.style("bg-slate-200 p-2 rounded-md ");

  const valueTextVariant = label ? "subtext" : "body";

  const onCopyPress = () => {
    Haptics.selectionAsync();
    Clipboard.setStringAsync(value);
  };

  return (
    <View style={containerClasses}>
      <View style={tw`shrink`}>
        {label && (
          <Text variant="body" numberOfLines={1} style={tw`text-primary`}>
            {label}
          </Text>
        )}

        <Text
          numberOfLines={1}
          variant={valueTextVariant}
          style={tw`text-slate-500`}
        >
          {value}
        </Text>
      </View>

      <TouchableOpacity style={iconContainerClasses} onPress={onCopyPress}>
        <RemixIcon
          name="ri-file-copy-line"
          size={20}
          color={tw.color("slate-400")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CopyItem;

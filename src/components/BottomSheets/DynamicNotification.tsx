/*
 * Created on Sun Sep 10 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import type { BottomSheetProps, SheetData } from "./@types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import IconLabel from "@/ui/IconLabel";
import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const DynamicNotificationSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={(props?: SheetData<"DYNAMIC_NOTIFICATION">) => {
        console.log(props);
        const { title, message, iconName, iconColor } = props!.data;

        return (
          <BottomSheetContainer contentContainerStyle={tw`items-center`}>
            {iconName && (
              <IconLabel
                iconName={iconName}
                iconColor={iconColor}
                color="secondary"
              />
            )}

            <View style={tw`items-center gap-y-1`}>
              <Text type="h1">{title}</Text>
              <Text type="p1">{message}</Text>
            </View>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default DynamicNotificationSheet;

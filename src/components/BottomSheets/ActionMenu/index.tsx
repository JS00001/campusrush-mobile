/*
 * Created on Tue Sep 03 2024
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

import React from "react";
import * as Haptic from "expo-haptics";

import MenuSection from "./MenuSection";
import type { BottomSheetProps, SheetData } from "../@types";

import tw from "@/lib/tailwind";
import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const ActionMenuSheet: React.FC<BottomSheetProps> = ({ innerRef, close }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={(props?: SheetData<"ACTION_MENU">) => {
        const menu = props!.data;

        const onMenuItemPress = () => {
          Haptic.notificationAsync(Haptic.NotificationFeedbackType.Success);
          close();
        };

        return (
          <BottomSheetContainer
            style={tw`px-0`}
            contentContainerStyle={tw`gap-y-4`}
          >
            {menu.map((item, index) => {
              const hasSeparator = menu.length - 1 !== index;

              return (
                <MenuSection
                  key={index}
                  section={item}
                  separator={hasSeparator}
                  onPress={onMenuItemPress}
                />
              );
            })}
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default ActionMenuSheet;

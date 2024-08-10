/*
 * Created on Thu Apr 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type { BottomSheetProps, SheetData } from "./@types";

import Text from "@/ui/Text";
import { BottomSheet } from "@/ui/BottomSheet";
import TagSelector from "@/components/TagSelector";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const TagSelectorSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={(props?: SheetData<"TAG_SELECTOR">) => {
        const { values, onTagChange } = props!.data;

        return (
          <BottomSheetContainer>
            <Text type="h1">Select Tags</Text>
            <TagSelector values={values} onChange={onTagChange} />
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default TagSelectorSheet;

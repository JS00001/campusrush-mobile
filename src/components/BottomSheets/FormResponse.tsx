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

import AppConstants from "@/constants";
import type { BottomSheetProps, SheetData } from "./@types";

import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import format from "@/lib/util/format";

const FormResponseSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={(data?: SheetData<"FORM_RESPONSE">) => {
        const response = data!.data.response;
        const fields = data!.data.fields.filter((field) => {
          return AppConstants.formReservedIds.includes(field.id);
        });

        return (
          <BottomSheetContainer contentContainerStyle={tw`gap-y-6`}>
            <Headline
              title={response.pnm.displayName}
              subtitle={format.phoneNumber(response.pnm.phoneNumber)}
            />
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default FormResponseSheet;

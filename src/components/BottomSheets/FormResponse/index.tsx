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

import CheckboxValue from "./Components/CheckboxValue";

import type { BottomSheetProps, SheetData } from "../@types";

import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import { FieldType } from "@/@types";
import FormField from "@/ui/FormField";
import format from "@/lib/util/format";
import AppConstants from "@/constants";
import { BottomSheet } from "@/ui/BottomSheet";
import BottomSheetContainer from "@/ui/BottomSheet/Container";

const FormResponseSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  return (
    <BottomSheet
      innerRef={innerRef}
      children={(data?: SheetData<"FORM_RESPONSE">) => {
        const response = data!.data.response;
        const fields = data!.data.fields.filter((field) => {
          return !AppConstants.formReservedIds.includes(field.id);
        });

        return (
          <BottomSheetContainer contentContainerStyle={tw`gap-y-6`}>
            <Headline
              title={response.pnm.displayName}
              subtitle={format.phoneNumber(response.pnm.phoneNumber)}
            />

            <View style={tw`gap-2`}>
              {fields.map((field) => {
                const fieldName = field.name + (field.required ? "*" : "");
                const pnmResponse = response.responses[field.id];

                if (field.type === FieldType.CHECKBOX) {
                  const response = !!pnmResponse;
                  return (
                    <CheckboxValue
                      key={field.id}
                      fieldName={fieldName}
                      response={response}
                    />
                  );
                }

                return (
                  <FormField
                    multiline
                    disabled
                    key={field.id}
                    placeholder={fieldName}
                    contentContainerStyle={tw`opacity-100`}
                    value={(pnmResponse as string) || "N/A"}
                  />
                );
              })}
            </View>
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default FormResponseSheet;

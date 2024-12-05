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
import Checkbox from "expo-checkbox";

import AppConstants from "@/constants";
import type { BottomSheetProps, SheetData } from "./@types";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Headline from "@/ui/Headline";
import { FieldType } from "@/@types";
import FormField from "@/ui/FormField";
import format from "@/lib/util/format";
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
                    <View
                      key={field.id}
                      style={tw`rounded-xl gap-2 bg-gray-100 px-4 py-2`}
                    >
                      <Text type="p4" numberOfLines={2}>
                        {fieldName}
                      </Text>

                      <View style={tw`gap-1`}>
                        <View style={tw`flex-row gap-2 items-center`}>
                          <Checkbox
                            color={tw.color("primary")}
                            value={response}
                            disabled
                          />
                          <Text type="p2">Yes</Text>
                        </View>
                        <View style={tw`flex-row gap-2 items-center`}>
                          <Checkbox
                            color={tw.color("primary")}
                            value={!response}
                            disabled
                          />
                          <Text type="p2">No</Text>
                        </View>
                      </View>
                    </View>
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

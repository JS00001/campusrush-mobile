/*
 * Created on Sat Nov 30 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View, TouchableOpacity } from "react-native";

import type { IForm, IFormResponse, IPNM } from "@/types";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { FieldType } from "@/@types";
import AppConstants from "@/constants";
import IconLabel from "@/ui/IconLabel";
import { useBottomSheetStore } from "@/store";

interface FormResponseProps {
  displayFormTitle?: boolean;
  response: Omit<IFormResponse, "form" | "pnm"> & {
    form: IForm;
    pnm: IPNM;
  };
}

const FormResponse: React.FC<FormResponseProps> = ({
  displayFormTitle,
  response,
}) => {
  const bottomSheetStore = useBottomSheetStore();

  const onClick = () => {
    bottomSheetStore.open("FORM_RESPONSE", {
      response,
      fields: response.form.fields,
    });
  };

  const fields = response.form.fields.filter((field) => {
    return !AppConstants.formReservedIds.includes(field.id);
  });

  // If they exist, get the first 2 response.responses, and their matching form fields
  // so that we can display them in the list item
  const responses = fields.slice(0, 2).map((field) => {
    const responseValue = (() => {
      const value = response.responses[field.id];
      if (field.type === FieldType.CHECKBOX) return !!value ? "Yes" : "No";
      else return (value as string) || "N/A";
    })();

    return { field, responseValue };
  });

  const remainingFieldCount = fields.length - responses.length;
  const title = displayFormTitle
    ? response.form.title
    : response.pnm.displayName;

  const containerClasses = tw.style(
    "flex-row items-center gap-2 justify-between",
    "bg-gray-100 rounded-xl p-5",
  );

  return (
    <TouchableOpacity onPress={onClick} style={containerClasses}>
      <View style={tw`gap-1.5 shrink`}>
        <Text type="h4" numberOfLines={1}>
          {title}
        </Text>

        <View style={tw`gap-2`}>
          {responses.map(({ field, responseValue }, index) => (
            <IconLabel
              key={index}
              size="sm"
              color="tertiary"
              iconName="ListBullets"
              title={field.name}
              subtitle={responseValue}
            />
          ))}
        </View>

        {remainingFieldCount > 0 && (
          <Text type="p2">... and {remainingFieldCount} more responses</Text>
        )}
      </View>

      <Icon icon="CaretRight" size={16} />
    </TouchableOpacity>
  );
};

export default FormResponse;

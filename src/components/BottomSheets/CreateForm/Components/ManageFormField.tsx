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

import { z } from "zod";
import uuid from "react-native-uuid";

import type { BottomSheetProps, SheetData } from "../../@types";

import Text from "@/ui/Text";
import { BottomSheet } from "@/ui/BottomSheet";

import { FieldType } from "@/@types";
import useForm from "@/hooks/useForm";
import validators from "@/constants/validators";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import FormField from "@/ui/FormField";
import Select from "@/ui/Select";

const ManageFormFieldSheet: React.FC<BottomSheetProps> = ({ innerRef }) => {
  const form = useForm({
    validators: {
      id: validators.shortContentString,
      name: validators.shortContentString,
      type: z.enum(["text", "longtext", "checkbox"]),
      required: z.boolean(),
    },
    initialValues: {
      id: uuid.v4(),
      name: "",
      type: FieldType.TEXT,
      required: false,
    },
  });

  return (
    <BottomSheet
      innerRef={innerRef}
      children={(props?: SheetData<"MANAGE_FORM_FIELD">) => {
        return (
          <BottomSheetContainer>
            <Text type="h2">New Field</Text>
            <FormField
              placeholder="Field Name"
              value={form.state.name.value}
              error={form.state.name.error}
            />
            <Select
              options={[FieldType.TEXT, FieldType.LONGTEXT, FieldType.CHECKBOX]}
              onChange={(value) => form.setValue("type", value)}
              value={form.state.type.value}
              placeholder="Field Type"
            />
          </BottomSheetContainer>
        );
      }}
    />
  );
};

export default ManageFormFieldSheet;

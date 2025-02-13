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

import type { ISelectOption } from "@/ui/Select/@types";
import type { BottomSheetProps, SheetData } from "../../@types";

import Select from "@/ui/Select";
import Button from "@/ui/Button";
import Switch from "@/ui/Switch";
import Headline from "@/ui/Headline";
import { FieldType } from "@/@types";
import useForm from "@/hooks/useForm";
import FormField from "@/ui/FormField";
import ButtonGroup from "@/ui/ButtonGroup";
import { BottomSheet } from "@/ui/BottomSheet";
import validators from "@/constants/validators";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import useKeyboardListener from "@/hooks/useKeyboardListener";

type Props = BottomSheetProps & SheetData<"MANAGE_FORM_FIELD">;

const Content: React.FC<Props> = ({
  data: { field, onFieldChange },
  close,
  snapToIndex,
  snapToPosition,
}) => {
  const initialValues = field || {
    name: "",
    id: uuid.v4(),
    required: false,
    type: undefined,
  };

  const form = useForm({
    initialValues,
    validators: {
      id: validators.shortContentString,
      name: validators.shortContentString,
      type: z.enum(["text", "longtext", "checkbox"], {
        required_error: "Field type is required",
        invalid_type_error: "Invalid field type",
      }),
      required: z.boolean(),
    },
  });

  const selectOptions: ISelectOption[] = [
    {
      label: "Text",
      value: FieldType.Text,
    },
    {
      label: "Paragraph",
      value: FieldType.LongText,
    },
    {
      label: "Checkbox",
      value: FieldType.Checkbox,
    },
  ];

  const onSave = () => {
    const isValid = form.validateState();

    if (isValid) {
      const values = form.getValues();
      onFieldChange(values);
      close();
    }
  };

  useKeyboardListener({
    onKeyboardWillShow: () => {
      snapToPosition("85%");
    },
    onKeyboardWillHide: () => {
      snapToIndex(0);
    },
  });

  return (
    <BottomSheetContainer>
      <Headline title="New Field" subtitle="Create a new field for your form" />

      <FormField
        placeholder="Field Name"
        value={form.state.name.value}
        error={form.state.name.error}
        onChangeText={(value) => form.setValue("name", value)}
      />

      <Select
        options={selectOptions}
        placeholder="Field Type"
        error={form.state.type.error}
        value={form.state.type.value}
        onChange={(value) => form.setValue("type", value)}
      />

      <Switch
        label="Required?"
        value={form.state.required.value}
        onValueChange={(value) => form.setValue("required", value)}
      />

      <ButtonGroup>
        <Button color="secondary" onPress={close}>
          Cancel
        </Button>
        <Button color="primary" onPress={onSave}>
          Save
        </Button>
      </ButtonGroup>
    </BottomSheetContainer>
  );
};

const ManageFormFieldSheet: React.FC<BottomSheetProps> = (props) => {
  return (
    <BottomSheet
      innerRef={props.innerRef}
      children={(data?: SheetData<"MANAGE_FORM_FIELD">) => {
        return <Content data={data!.data} {...props} />;
      }}
    />
  );
};

export default ManageFormFieldSheet;

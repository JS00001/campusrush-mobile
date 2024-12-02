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
import { View } from "react-native";
import uuid from "react-native-uuid";

import type { BottomSheetProps, SheetData } from "../../@types";

import Text from "@/ui/Text";
import { BottomSheet } from "@/ui/BottomSheet";

import tw from "@/lib/tailwind";
import Select from "@/ui/Select";
import Button from "@/ui/Button";
import Switch from "@/ui/Switch";
import Headline from "@/ui/Headline";
import { FieldType } from "@/@types";
import useForm from "@/hooks/useForm";
import FormField from "@/ui/FormField";
import ButtonGroup from "@/ui/ButtonGroup";
import validators from "@/constants/validators";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import useKeyboardListener from "@/hooks/useKeyboardListener";

type Props = BottomSheetProps & SheetData<"MANAGE_FORM_FIELD">;

// PR_TODO: Cleanup the ui of this
const Content: React.FC<Props> = ({
  data: { field, onFieldChange },
  handleClose,
  snapToIndex,
  snapToPosition,
}) => {
  const initialValues = field || {
    name: "",
    id: uuid.v4(),
    required: false,
    type: FieldType.TEXT,
  };

  const form = useForm({
    initialValues,
    validators: {
      id: validators.shortContentString,
      name: validators.shortContentString,
      type: z.enum(["text", "longtext", "checkbox"]),
      required: z.boolean(),
    },
  });

  const onSave = () => {
    const isValid = form.validateState();

    if (isValid) {
      const values = form.getValues();
      onFieldChange(values);
      handleClose();
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
        placeholder="Field Type"
        error={form.state.type.error}
        value={form.state.type.value}
        options={[FieldType.TEXT, FieldType.LONGTEXT, FieldType.CHECKBOX]}
        onChange={(value) => form.setValue("type", value)}
      />

      {/* PR_TODO: Make this one component */}
      <View style={tw`flex-row items-center gap-2`}>
        <Switch
          value={form.state.required.value}
          onValueChange={(value) => form.setValue("required", value)}
        />
        <Text>Required?</Text>
      </View>

      <ButtonGroup>
        <Button size="sm" color="secondary" onPress={handleClose}>
          Cancel
        </Button>
        <Button size="sm" color="primary" onPress={onSave}>
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

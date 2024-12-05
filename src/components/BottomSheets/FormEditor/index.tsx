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
import * as Haptic from "expo-haptics";
import Toast from "react-native-toast-message";
import { TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";

import type { BottomSheetProps, SheetData } from "../@types";

import CustomFormField from "./Components/CustomFormField";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { Layout } from "@/ui/Layout";
import Headline from "@/ui/Headline";
import FormField from "@/ui/FormField";
import AppConstants from "@/constants";
import { FormSheet } from "@/ui/BottomSheet";
import validators from "@/constants/validators";
import { FieldType, IFormField } from "@/@types";
import FormHeader from "@/components/Headers/Form";
import useFormMutation from "@/hooks/useFormMutation";
import { useBottomSheetStore, useStatusStore } from "@/store";
import { useCreateForm, useUpdateForm } from "@/hooks/api/forms";

type Props = BottomSheetProps & SheetData<"FORM_EDITOR">;

const FormEditorContent: React.FC<Props> = ({ data = {}, close }) => {
  const isEditing = !!data.form;

  const createFormMutation = useCreateForm();
  const updateFormMutation = useUpdateForm();
  const { setStatusOverlay } = useStatusStore();
  const bottomSheetStore = useBottomSheetStore();

  const commonFormValidators = {
    title: validators.shortContentString,
    enabled: z.boolean(),
    fields: z.array(
      z.object({
        id: validators.shortContentString,
        name: validators.shortContentString,
        type: z.enum(["text", "longtext", "checkbox"]),
        required: z.boolean(),
      }),
    ),
  };

  const creationForm = useFormMutation({
    mutation: createFormMutation,
    validators: commonFormValidators,
    initialValues: {
      title: "",
      enabled: true,
      fields: [],
    },
    onSuccess: async () => {
      close();
      Toast.show({
        type: "success",
        text1: "Created Form",
        text2: "Your form has been created successfully",
      });
    },
  });

  const updateForm = useFormMutation({
    mutation: updateFormMutation,
    validators: {
      ...commonFormValidators,
      id: validators.shortContentString,
    },
    initialValues: {
      ...data.form,
      id: data.form?._id,
      fields: data.form?.fields.filter((f) => {
        return !AppConstants.formReservedIds.includes(f.id);
      }),
    },
    onSuccess: async () => {
      close();
      Toast.show({
        type: "success",
        text1: "Updated Form",
        text2: "Your form has been updated.",
      });
    },
  });

  const form = isEditing ? updateForm : creationForm;

  const onDeleteField = (id: string) => {
    const updatedFields = form.state.fields.value.filter((f: IFormField) => {
      return f.id !== id;
    });

    form.setValue("fields", updatedFields);
  };

  const onUpdateField = (id: string, field: Partial<IFormField>) => {
    const updatedFields = form.state.fields.value.map((f: IFormField) => {
      return f.id === id ? { ...f, ...field } : f;
    });

    form.setValue("fields", updatedFields);
  };

  const onAddField = () => {
    bottomSheetStore.open("MANAGE_FORM_FIELD", {
      onFieldChange: (field: IFormField) => {
        form.setValue("fields", [...form.state.fields.value, field]);
      },
    });
  };

  const handleSubmission = async () => {
    setStatusOverlay("loading");
    const isValid = form.validateState();

    if (!isValid) {
      setStatusOverlay("idle");
      return;
    }

    await form.handleSubmission();
    setStatusOverlay("idle");
  };

  const fields = form.state.fields.value as IFormField[];

  return (
    <Layout.Content
      gap={12}
      safeAreaPosition="top"
      contentContainerStyle={tw`pt-0 items-start gap-4 pb-4`}
    >
      <FormHeader
        disableSave={form.loading}
        onCancel={close}
        onSave={handleSubmission}
      />

      <Text type="h1">Create Form</Text>

      <FormField
        placeholder="Form Title"
        value={form.state.title.value}
        error={form.state.title.error}
        onChangeText={form.setValue.bind(null, "title")}
      />

      <Headline
        title="General Information"
        subtitle="This information is required on all forms"
      />

      <View style={tw`disabled`} pointerEvents="none">
        <CustomFormField
          item={{
            id: "first_name",
            name: "First Name",
            type: FieldType.TEXT,
            required: true,
          }}
        />
        <CustomFormField
          item={{
            id: "last_name",
            name: "Last Name",
            type: FieldType.TEXT,
            required: true,
          }}
        />
        <CustomFormField
          item={{
            id: "phone_number",
            name: "PhoneNumber",
            type: FieldType.TEXT,
            required: true,
          }}
        />
      </View>

      <View style={tw`flex-row items-center justify-between w-full`}>
        <Headline
          title="Custom Fields"
          subtitle="Add your own fields to the form"
        />

        <TouchableOpacity
          style={tw`bg-gray-100 px-2 py-1 rounded-full`}
          onPress={onAddField}
        >
          <Text type="p3" style={tw`text-primary`}>
            Add Field
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1`}>
        <DraggableFlatList
          data={fields}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={(props) => {
            return (
              <CustomFormField
                {...props}
                onChange={onUpdateField}
                onDelete={onDeleteField}
              />
            );
          }}
          onDragEnd={({ data }) => {
            form.setValue("fields", data);
            Haptic.impactAsync(Haptic.ImpactFeedbackStyle.Medium);
          }}
        />
      </View>
    </Layout.Content>
  );
};

const FormEditorSheet: React.FC<BottomSheetProps> = (props) => {
  return (
    <FormSheet
      innerRef={props.innerRef}
      children={(data?: SheetData<"FORM_EDITOR">) => {
        return <FormEditorContent data={data!.data} {...props} />;
      }}
    />
  );
};

export default FormEditorSheet;

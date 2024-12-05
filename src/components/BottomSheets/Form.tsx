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

import { View } from "react-native";
import Toast from "react-native-toast-message";

import { BottomSheetProps, SheetData } from "./@types";

import useCopy from "@/hooks/useCopy";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import { alert } from "@/lib/util";
import date from "@/lib/util/date";
import Headline from "@/ui/Headline";
import AppConstants from "@/constants";
import { Detail } from "@/ui/DetailList";
import IconButton from "@/ui/IconButton";
import ButtonGroup from "@/ui/ButtonGroup";
import { useBottomSheetStore } from "@/store";
import { BottomSheet } from "@/ui/BottomSheet";
import ErrorMessage from "@/components/ErrorMessage";
import BottomSheetContainer from "@/ui/BottomSheet/Container";
import { useDeleteForm, useGetForm } from "@/hooks/api/forms";

type Props = BottomSheetProps & SheetData<"FORM">;

const Content: React.FC<Props> = ({ data, close }) => {
  const initialForm = data.form;

  const copy = useCopy();
  const bottomSheetStore = useBottomSheetStore();

  const deleteMutation = useDeleteForm();
  const query = useGetForm(initialForm._id);

  const form = query.data?.form || initialForm;

  // Error State
  if (query.isError || !form) {
    return (
      <ErrorMessage
        error={query.error}
        description="Could not fetch the form"
      />
    );
  }

  const formUrl = `${AppConstants.formUrl}/${form._id}`;
  const lastResponseAt = form.lastResponseAt
    ? `Last response ${date.timeAgo(form.lastResponseAt)}`
    : "No responses yet";

  const onDelete = async () => {
    alert({
      title: "Delete Form",
      message: "Are you sure you want to delete this form?",
      buttons: [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const formName = form.title;
            await deleteMutation.mutateAsync({ id: form._id });

            Toast.show({
              type: "success",
              text1: "Form deleted",
              text2: `${formName} has been deleted successfully`,
            });

            close();
          },
        },
      ],
    });
  };

  const onEditPress = () => {
    bottomSheetStore.open("FORM_EDITOR", { form });
  };

  const onViewResponsesPress = () => {
    close();
    bottomSheetStore.open("FORM_RESPONSES", { formId: form._id });
  };

  const onShare = () => {
    copy(formUrl, "Form Link");
  };

  return (
    <BottomSheetContainer>
      <View style={tw`mb-2 flex-row justify-between items-center`}>
        <Headline
          style={tw`shrink`}
          title={form.title}
          subtitle={`Created on ${date.toString(form.createdAt)}`}
        />

        <View style={tw`flex-row gap-1`}>
          <IconButton
            ph-label="share-form"
            size="sm"
            iconName="Link"
            color="secondary"
            onPress={onShare}
          />
          <IconButton
            ph-label="delete-form"
            size="sm"
            color="secondary"
            iconName="Trash"
            iconColor={tw.color("red-500")}
            loading={deleteMutation.isPending}
            onPress={onDelete}
          />
        </View>
      </View>

      <Detail.List>
        <Detail.Item title="Last Response" value={lastResponseAt} />
        <Detail.Item
          title="Status"
          value={form.enabled ? "Form enabled" : "Form disabled"}
        />
        <Detail.Item
          title="Response Count"
          value={`${form.responseCount} responses`}
        />
        <Detail.Item
          title="Questions"
          value={`${form.fields.length} questions`}
        />
      </Detail.List>

      <ButtonGroup>
        <Button size="sm" color="secondary" onPress={onEditPress}>
          Edit
        </Button>
        <Button size="sm" onPress={onViewResponsesPress}>
          View Responses
        </Button>
      </ButtonGroup>
    </BottomSheetContainer>
  );
};

const FormSheet: React.FC<BottomSheetProps> = (props) => {
  return (
    <BottomSheet
      innerRef={props.innerRef}
      children={(data?: SheetData<"FORM">) => {
        return <Content data={data!.data} {...props} />;
      }}
    />
  );
};

export default FormSheet;

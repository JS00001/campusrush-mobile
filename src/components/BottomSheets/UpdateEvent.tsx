/*
 * Created on Mon Feb 26 2024
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
import { BottomSheetProps } from "./@types";

import { useEvent } from "@/store";
import { useUpdateEvent } from "@/hooks/api/events";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import TextInput from "@/ui/TextInput";
import { FormSheet } from "@/ui/BottomSheet";
import validators from "@/constants/validators";
import DateTimePicker from "@/ui/DateTimePicker";
import FormHeader from "@/components/Headers/Form";
import useFormMutation from "@/hooks/useFormMutation";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

const UpdateEventSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  handleClose,
}) => {
  return (
    <FormSheet
      innerRef={innerRef}
      children={(data) => {
        const eventId = data?.data.eventId as string;

        const store = useEvent(eventId);
        const updateMutation = useUpdateEvent();

        const currentDate = new Date();
        const startDate = new Date(store.event?.startDate || "")
          .getTime()
          .toString();
        const endDate = new Date(store.event?.endDate || "")
          .getTime()
          .toString();

        const formValidators = {
          id: validators.objectId,
          title: validators.shortContentString,
          location: validators.shortContentString,
          startDate: z.any(),
          endDate: z.any(),
          description: validators.longContentString,
        };

        const form = useFormMutation({
          mutation: updateMutation,
          validators: formValidators,
          onSuccess: async ({ data }) => {
            store.updateEvent(data.event);
            store.refetch();
            handleClose();
          },
          initialValues: {
            id: eventId,
            title: store.event?.title,
            location: store.event?.location,
            startDate: startDate,
            endDate: endDate,
            description: store.event?.description,
          },
        });

        const newStartDate = new Date(parseInt(form.state.startDate.value));
        const newEndDate = new Date(parseInt(form.state.endDate.value));

        const onDateTimeChange = (
          event: DateTimePickerEvent,
          field: "startDate" | "endDate",
          date?: Date,
        ) => {
          const { type } = event;

          if (type === "set") {
            const time = date?.getTime();

            if (!time) return;

            form.setValue(field, time.toString());
          }
        };

        const handleSubmission = () => {
          const isValid = form.validateState();

          if (!isValid) return;

          const startDate = new Date(parseInt(form.state.startDate.value));
          const endDate = new Date(parseInt(form.state.endDate.value));

          if (startDate >= endDate) {
            form.setError("endDate", "End date must be after start date");
            return;
          }

          form.handleSubmission();
        };

        // TODO: Add proper loading state
        if (!store.event) {
          return <Text>Loading...</Text>;
        }

        return (
          <Layout
            scrollable
            contentContainerStyle={tw`pt-0 items-start`}
            gap={12}
          >
            <FormHeader onSave={handleSubmission} onCancel={handleClose} />

            <Text variant="header" style={tw`text-primary`}>
              Edit Event
            </Text>

            <TextInput
              placeholder="Title"
              value={form.state.title.value}
              error={form.state.title.error}
              onChangeText={form.setValue.bind(null, "title")}
            />
            <TextInput
              placeholder="Location"
              value={form.state.location.value}
              error={form.state.location.error}
              onChangeText={form.setValue.bind(null, "location")}
            />

            <DateTimePicker
              label="Starts at"
              mode="datetime"
              value={newStartDate}
              minimumDate={currentDate}
              error={form.state.startDate.error}
              onChange={(event, date) =>
                onDateTimeChange(event, "startDate", date)
              }
            />

            <DateTimePicker
              label="Ends at"
              mode="datetime"
              value={newEndDate}
              minimumDate={newStartDate}
              error={form.state.endDate.error}
              onChange={(event, date) =>
                onDateTimeChange(event, "endDate", date)
              }
            />

            <TextInput
              multiline
              blurOnSubmit
              returnKeyType="done"
              inputStyle={tw`h-36`}
              placeholder="Description"
              value={form.state.description.value}
              error={form.state.description.error}
              onChangeText={form.setValue.bind(null, "description")}
            />
          </Layout>
        );
      }}
    />
  );
};

export default UpdateEventSheet;

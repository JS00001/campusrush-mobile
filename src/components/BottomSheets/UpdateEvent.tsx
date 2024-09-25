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
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import { BottomSheetProps, SheetData } from "./@types";

import useFormMutation from "@/hooks/useFormMutation";
import { useEventStore, useStatusStore } from "@/store";
import { useGetEvent, useUpdateEvent } from "@/hooks/api/events";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import { Layout } from "@/ui/Layout";
import FormField from "@/ui/FormField";
import { FormSheet } from "@/ui/BottomSheet";
import validators from "@/constants/validators";
import DateTimePicker from "@/ui/DateTimePicker";
import FormHeader from "@/components/Headers/Form";

const UpdateEventSheet: React.FC<BottomSheetProps> = ({
  innerRef,
  handleClose,
}) => {
  return (
    <FormSheet
      innerRef={innerRef}
      children={(props?: SheetData<"UPDATE_EVENT">) => {
        const { eventId } = props!.data;

        const eventStore = useEventStore();
        const eventQuery = useGetEvent(eventId);
        const updateEventMutation = useUpdateEvent();
        const setStatusOverlay = useStatusStore((s) => s.setStatusOverlay);

        const currentDate = new Date();
        const startDate = eventQuery.event?.startDate || new Date();
        const endDate = eventQuery.event?.endDate || new Date();

        const formValidators = {
          id: validators.objectId,
          title: validators.shortContentString,
          location: validators.shortContentString,
          startDate: z.string().datetime({ offset: true }),
          endDate: z.string().datetime({ offset: true }),
          description: validators.longContentString,
        };

        const form = useFormMutation({
          mutation: updateEventMutation,
          validators: formValidators,
          onSuccess: async ({ data }) => {
            eventStore.addOrUpdateEvent(data.event);
            eventQuery.refetch();
            handleClose();
          },
          initialValues: {
            id: eventId,
            title: eventQuery.event?.title,
            location: eventQuery.event?.location,
            description: eventQuery.event?.description,
            startDate: new Date(startDate).toISOString(),
            endDate: new Date(endDate).toISOString(),
          },
        });

        const newStartDate = new Date(form.state.startDate.value);
        const newEndDate = new Date(form.state.endDate.value);

        const onDateTimeChange = (
          event: DateTimePickerEvent,
          field: "startDate" | "endDate",
          date?: Date,
        ) => {
          const { type } = event;

          if (type === "set") {
            if (!date) return;

            form.setValue(field, date.toISOString());
          }
        };

        const handleSubmission = async () => {
          setStatusOverlay("loading");
          const isValid = form.validateState();

          if (!isValid) {
            setStatusOverlay("idle");
            return;
          }

          const startDate = new Date(form.state.startDate.value);
          const endDate = new Date(form.state.endDate.value);

          if (startDate >= endDate) {
            form.setError("endDate", "End date must be after start date");
            setStatusOverlay("idle");
            return;
          }

          await form.handleSubmission();
          setStatusOverlay("idle");
        };

        return (
          <Layout.Root>
            <Layout.Content
              gap={12}
              scrollable
              safeAreaPosition="top"
              contentContainerStyle={tw`pt-0 items-start`}
            >
              <FormHeader onSave={handleSubmission} onCancel={handleClose} />

              <Text type="h1" style={tw`text-primary`}>
                Edit Event
              </Text>

              <FormField
                placeholder="Title"
                value={form.state.title.value}
                error={form.state.title.error}
                onChangeText={form.setValue.bind(null, "title")}
              />
              <FormField
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
                onChange={(event, date) => {
                  return onDateTimeChange(event, "startDate", date);
                }}
              />

              <DateTimePicker
                label="Ends at"
                mode="datetime"
                value={newEndDate}
                minimumDate={newStartDate}
                error={form.state.endDate.error}
                onChange={(event, date) => {
                  return onDateTimeChange(event, "endDate", date);
                }}
              />

              <FormField
                multiline
                blurOnSubmit
                returnKeyType="done"
                style={tw`h-36`}
                placeholder="Description"
                value={form.state.description.value}
                error={form.state.description.error}
                onChangeText={form.setValue.bind(null, "description")}
              />
            </Layout.Content>
          </Layout.Root>
        );
      }}
    />
  );
};

export default UpdateEventSheet;

/*
 * Created on Wed Dec 20 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { ActivityIndicator } from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import FormSheet from "./Components/FormSheet";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import TextInput from "@/ui/TextInput";
import StatusIcon from "@/ui/StatusIcon";
import DateTimePicker from "@/ui/DateTimePicker";
import FormHeader from "@/components/Headers/Form";
import useUpdateEvent from "@/hooks/events/useUpdateEvent";

interface UpdateEventProps {
  innerRef: React.RefObject<any>;
  handleCloseModalPress: () => void;
}

const UpdateEvent: React.FC<UpdateEventProps> = ({
  handleCloseModalPress,
  innerRef,
}) => {
  const onCancel = () => {
    handleCloseModalPress();
  };

  return (
    <FormSheet
      innerRef={innerRef}
      children={(data) => {
        const eventId = data?.data.eventId;
        const form = useUpdateEvent(eventId);

        const today = new Date();
        const endDate = new Date(parseInt(form.endDate));
        const startDate = new Date(parseInt(form.startDate));

        const onDateTimeChange = (
          event: DateTimePickerEvent,
          field: "startDate" | "endDate",
          date?: Date,
        ) => {
          const { type } = event;

          if (type === "set") {
            const time = date?.getTime();

            // If the time is null, then the user dismissed the picker
            // so we should just return
            if (!time) return;

            // Otherwise, set the start date to the time
            form.setField(field, time.toString());
          }
        };

        const onSave = async () => {
          const isValid = form.validateFields();

          if (!isValid) return;

          await form.handleSubmission();
          handleCloseModalPress();
        };

        return (
          <>
            {form.loading && (
              <StatusIcon>
                <StatusIcon.Icon>
                  <ActivityIndicator size="large" color="white" />
                </StatusIcon.Icon>
              </StatusIcon>
            )}

            <Layout
              scrollable
              contentContainerStyle={tw`pt-0 items-start`}
              gap={12}
            >
              <FormHeader onSave={onSave} onCancel={onCancel} />

              <Text variant="header" style={tw`text-primary`}>
                Edit Event
              </Text>

              <TextInput
                placeholder="Title"
                value={form.title}
                error={form.errors.title}
                onChangeText={(text) => form.setField("title", text)}
              />
              <TextInput
                placeholder="Location"
                value={form.location}
                error={form.errors.location}
                onChangeText={(text) => form.setField("location", text)}
              />

              <DateTimePicker
                label="Starts at"
                mode="datetime"
                value={startDate}
                minimumDate={today}
                error={form.errors.startDate}
                onChange={(event, date) =>
                  onDateTimeChange(event, "startDate", date)
                }
              />

              <DateTimePicker
                label="Ends at"
                mode="datetime"
                value={endDate}
                minimumDate={startDate}
                error={form.errors.endDate}
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
                value={form.description}
                error={form.errors.description}
                onChangeText={(text) => form.setField("description", text)}
              />
            </Layout>
          </>
        );
      }}
    ></FormSheet>
  );
};

export default UpdateEvent;

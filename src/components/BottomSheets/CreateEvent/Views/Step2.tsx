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
import { useEffect } from "react";
import { View } from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import useForm from "@/hooks/useForm";
import { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui_v1/Button";
import ButtonGroup from "@/ui_v1/ButtonGroup";
import DateTimePicker from "@/ui_v1/DateTimePicker";

const Step2: React.FC<UseSheetFlowProps> = ({
  state,
  setState,
  nextView,
  prevView,
}) => {
  const currentTime = new Date();

  const formValidators = {
    startDate: z.any(),
    endDate: z.any(),
  };

  const form = useForm({
    validators: formValidators,
    initialValues: {
      startDate: state.startDate ?? new Date().getTime().toString(),
      endDate: state.endDate ?? new Date().getTime().toString(),
    },
  });

  const startDate = new Date(parseInt(form.state.startDate.value));
  const endDate = new Date(parseInt(form.state.endDate.value));

  // We need to make sure that the start date is always up to date when the component mounts
  useEffect(() => {
    const now = new Date();

    // We add a minute so that the start date is 'after' the current time
    const minuteFromNow = new Date(now.getTime() + 60 * 1000);
    const hourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    form.setValue("startDate", minuteFromNow.getTime().toString());
    form.setValue("endDate", hourFromNow.getTime().toString());
  }, []);

  const handleSubmission = () => {
    const isValid = form.validateState();

    if (!isValid) {
      return;
    }

    const startDate = new Date(parseInt(form.state.startDate.value));
    const endDate = new Date(parseInt(form.state.endDate.value));

    if (startDate >= endDate) {
      form.setError("endDate", "End date must be after start date");
      return;
    }

    setState((prevState: any) => ({
      ...prevState,
      startDate: form.state.startDate.value,
      endDate: form.state.endDate.value,
    }));

    nextView();
  };

  const onDateTimeChange = (
    event: DateTimePickerEvent,
    field: "startDate" | "endDate",
    date?: Date,
  ) => {
    const time = date?.getTime();

    if (!time) return;

    form.setValue(field, time.toString());
  };

  return (
    <>
      <View style={tw`gap-y-4`}>
        <View style={tw`mb-2`}>
          <Text type="h2">When's the Event?</Text>
          <Text>
            Enter when your event starts and ends. This can be changed later.
          </Text>
        </View>

        <DateTimePicker
          label="Starts at"
          mode="datetime"
          value={startDate}
          minimumDate={currentTime}
          error={form.state.startDate.error}
          onChange={(event, date) => onDateTimeChange(event, "startDate", date)}
        />
        <DateTimePicker
          label="Ends at"
          mode="datetime"
          value={endDate}
          minimumDate={startDate}
          error={form.state.endDate.error}
          onChange={(event, date) => onDateTimeChange(event, "endDate", date)}
        />

        <ButtonGroup>
          <Button size="sm" color="gray" onPress={prevView}>
            Go Back
          </Button>
          <Button size="sm" onPress={handleSubmission}>
            Next
          </Button>
        </ButtonGroup>
      </View>
    </>
  );
};

export default Step2;

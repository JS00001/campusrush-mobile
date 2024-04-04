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

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Headline from "@/ui/Headline";
import ButtonGroup from "@/ui/ButtonGroup";
import DateTimePicker from "@/ui/DateTimePicker";

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
    const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);
    const hourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    // Check if the current state of the start date is before the current time. If so, re-set it to a minute from now
    if (startDate < now) {
      form.setValue("startDate", fiveMinutesFromNow.getTime().toString());
    }

    // Check if the current state of the end date is before the current time. If so, re-set it to an hour from now
    if (endDate < now) {
      form.setValue("endDate", hourFromNow.getTime().toString());
    }
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

  // TODO: Cleanup
  const onDateTimeChange = (
    event: DateTimePickerEvent,
    field: "startDate" | "endDate",
    date?: Date,
  ) => {
    const time = date?.getTime();

    if (!time) return console.error("No time provided");

    form.setValue(field, time.toString());
  };

  return (
    <>
      <View style={tw`gap-y-4`}>
        <Headline
          title="When's the Event?"
          subtitle="Enter when your event starts and ends. This can be changed later."
        />

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
          <Button size="sm" color="secondary" onPress={prevView}>
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

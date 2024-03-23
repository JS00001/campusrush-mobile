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
import Toast from "react-native-toast-message";
import type { DateTimePickerEvent } from "@react-native-community/datetimepicker";

import Button from "@/ui/Button";
import useForm from "@/hooks/useForm";
import ButtonGroup from "@/ui/ButtonGroup";
import DateTimePicker from "@/ui/DateTimePicker";
import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";
import { useGrantAdminChapterEntitlement } from "@/hooks/api/admin";

interface ManageBillingProps extends UseSheetFlowProps {
  chapterId: string;
}

const ManageBilling: React.FC<ManageBillingProps> = ({
  chapterId,
  prevView,
}) => {
  const currentTime = new Date();
  const grantEntitlementMutation = useGrantAdminChapterEntitlement();

  const formValidators = {
    expires: z.any(),
  };

  const form = useForm({
    validators: formValidators,
    initialValues: {
      expires: new Date().getTime().toString(),
    },
  });

  const expires = new Date(parseInt(form.state.expires.value));

  useEffect(() => {
    const now = new Date();

    form.setValue("expires", now.getTime().toString());
  }, []);

  const handleSubmission = async () => {
    const isValid = form.validateState();

    if (!isValid) {
      return;
    }

    // Convert the expires time to seconds
    const expires = parseInt(form.state.expires.value) / 1000;

    const data = {
      id: chapterId,
      // TODO: This should be not hard coded technically
      entitlementId: "pro",
      expires,
    };

    const response = await grantEntitlementMutation.mutateAsync(data);

    if ("error" in response) {
      return;
    }

    Toast.show({
      type: "success",
      text1: "Entitlement granted",
      text2: "The entitlement has been granted to the chapter",
    });

    prevView();
  };

  const onDateTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    const time = date?.getTime();

    if (!time) return;

    form.setValue("expires", time.toString());
  };

  return (
    <>
      <DateTimePicker
        mode="datetime"
        label="Will Expire On"
        value={expires}
        minimumDate={currentTime}
        error={form.state.expires.error}
        onChange={onDateTimeChange}
      />

      <ButtonGroup>
        <Button size="sm" color="secondary" onPress={prevView}>
          Go Back
        </Button>

        <Button
          size="sm"
          loading={grantEntitlementMutation.isLoading}
          onPress={handleSubmission}
        >
          Grant Pro
        </Button>
      </ButtonGroup>
    </>
  );
};

export default ManageBilling;

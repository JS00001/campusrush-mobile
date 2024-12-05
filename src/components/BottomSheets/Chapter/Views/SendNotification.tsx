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
import { View } from "react-native";
import Toast from "react-native-toast-message";

import type { UseSheetFlowProps } from "@/hooks/useSheetFlow";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Switch from "@/ui/Switch";
import FormField from "@/ui/FormField";
import ButtonGroup from "@/ui/ButtonGroup";
import validators from "@/constants/validators";
import useFormMutation from "@/hooks/useFormMutation";
import useKeyboardListener from "@/hooks/useKeyboardListener";
import { useSendChapterNotification } from "@/hooks/api/admin";

interface SendNotificationProps extends UseSheetFlowProps {
  chapterId: string;
}

const SendNotification: React.FC<SendNotificationProps> = ({
  chapterId,
  setView,
  snapToPosition,
  snapToIndex,
}) => {
  const sendNotificationMutation = useSendChapterNotification();

  const formValidators = {
    id: validators.objectId,
    title: z.string().max(24),
    message: z.string().max(256),
    iconName: validators.iconName.optional(),
    iconColor: validators.colorHex.optional(),
    // Sends the notification to yourself in test mode
    testMode: z.boolean().optional(),
  };

  const form = useFormMutation({
    mutation: sendNotificationMutation,
    validators: formValidators,
    initialValues: {
      id: chapterId,
      title: undefined,
      message: undefined,
      iconName: undefined,
      iconColor: undefined,
      testMode: false,
    },
    onSuccess: async () => {
      Toast.show({
        type: "success",
        text1: "Notification sent",
        text2: "Your notification has been sent",
      });

      if (!form.state.testMode.value) {
        setView(0);
      }
    },
  });

  useKeyboardListener({
    onKeyboardWillShow: () => {
      snapToPosition("95%");
    },
    onKeyboardWillHide: () => {
      snapToIndex(0);
    },
  });

  const onBackPress = () => {
    setView(0);
  };

  return (
    <>
      <FormField
        placeholder="Title"
        value={form.state.title.value}
        error={form.state.title.error}
        onChangeText={form.setValue.bind(null, "title")}
      />
      <FormField
        placeholder="Icon Name (optional)"
        value={form.state.iconName.value}
        error={form.state.iconName.error}
        onChangeText={form.setValue.bind(null, "iconName")}
      />
      <FormField
        placeholder="Icon Color (optional)"
        value={form.state.iconColor.value}
        error={form.state.iconColor.error}
        onChangeText={form.setValue.bind(null, "iconColor")}
      />
      <FormField
        multiline
        blurOnSubmit
        returnKeyType="done"
        placeholder="Message"
        value={form.state.message.value}
        style={tw`h-36`}
        error={form.state.message.error}
        onChangeText={form.setValue.bind(null, "message")}
      />

      <View style={tw`flex-row items-center gap-2`}>
        <Switch
          value={form.state.testMode.value}
          onValueChange={form.setValue.bind(null, "testMode")}
        />
        <Text>Test Mode (Send to yourself)</Text>
      </View>

      <ButtonGroup>
        <Button color="secondary" onPress={onBackPress}>
          Go Back
        </Button>

        <Button
          loading={sendNotificationMutation.isPending}
          onPress={form.handleSubmission}
        >
          Send Notification
        </Button>
      </ButtonGroup>
    </>
  );
};

export default SendNotification;

/*
 * Created on Sat Feb 24 2024
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

import {
  useLogout,
  useResendVerification,
  useVerifyEmail,
} from "@/hooks/api/auth";
import Text from "@/ui_v1/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui_v1/Button";
import Hyperlink from "@/ui_v1/Hyperlink";
import TextInput from "@/ui_v1/TextInput";
import Content from "@/constants/content";
import { useAuth } from "@/providers/Auth";
import useFormMutation from "@/hooks/useFormMutation";

const VerificationView = () => {
  const logoutMutation = useLogout();
  const verifyEmailMutation = useVerifyEmail();
  const { clearUserData, updateChapter } = useAuth();
  const resendVerificationMutation = useResendVerification();

  const formValidators = {
    code: z.string().length(6, { message: "Invalid verification code" }),
  };

  const form = useFormMutation({
    mutation: verifyEmailMutation,
    validators: formValidators,
    onSuccess: async ({ data }) => {
      updateChapter(data.chapter);

      Toast.show({
        type: "success",
        text1: Content.verificationSuccess.verifyChapter.title,
        text2: Content.verificationSuccess.verifyChapter.message,
      });
    },
  });

  const resendVerificationEmail = async () => {
    await resendVerificationMutation.mutateAsync();

    Toast.show({
      type: "success",
      text1: Content.verificationSuccess.resendVerificationEmail.title,
      text2: Content.verificationSuccess.resendVerificationEmail.message,
    });
  };

  const onLogout = async () => {
    const res = await logoutMutation.mutateAsync();

    if ("error" in res.data) return;

    clearUserData();
  };

  return (
    <>
      <TextInput
        placeholder="Verification Code"
        error={form.state.code.error}
        value={form.state.code.value}
        onChangeText={form.setValue.bind(null, "code")}
      />

      <Button
        loading={form.loading}
        iconRight="ri-arrow-right-line"
        onPress={form.handleSubmission}
      >
        Continue
      </Button>

      <View style={tw`gap-y-2`}>
        <View style={tw`flex-row justify-center`}>
          <Text style={tw`text-center`}>Incorrect email address?&nbsp;</Text>
          <Hyperlink
            color="dark"
            onPress={onLogout}
            disabled={logoutMutation.isLoading}
          >
            Sign out
          </Hyperlink>
        </View>

        <View style={tw`flex-row justify-center`}>
          <Text style={tw`text-center`}>Didn't receive a code?&nbsp;</Text>
          <Hyperlink color="dark" onPress={resendVerificationEmail}>
            Resend
          </Hyperlink>
        </View>
      </View>
    </>
  );
};

export default VerificationView;

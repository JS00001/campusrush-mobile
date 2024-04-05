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
import { usePostHog } from "posthog-react-native";

import {
  useLogout,
  useResendVerification,
  useVerifyEmail,
} from "@/hooks/api/auth";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Hyperlink from "@/ui/Hyperlink";
import FormField from "@/ui/FormField";
import Content from "@/constants/content";
import { handle } from "@/lib/util/error";
import { useAuth } from "@/providers/Auth";
import useFormMutation from "@/hooks/useFormMutation";

const VerificationView = () => {
  const posthog = usePostHog();
  const logoutMutation = useLogout();
  const verifyEmailMutation = useVerifyEmail();
  const { clear, setChapter } = useAuth();
  const resendVerificationMutation = useResendVerification();

  const formValidators = {
    code: z.string().length(6, { message: "Invalid verification code" }),
  };

  const form = useFormMutation({
    mutation: verifyEmailMutation,
    validators: formValidators,
    onSuccess: async ({ data }) => {
      setChapter(data.chapter);

      handle(() => {
        posthog?.capture("CHAPTER_VERIFIED", {
          chapter_name: data.chapter.name,
          chapter_email: data.chapter.email,
        });
      });

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

    clear();
  };

  return (
    <>
      <FormField
        placeholder="Verification Code"
        error={form.state.code.error}
        value={form.state.code.value}
        onChangeText={form.setValue.bind(null, "code")}
      />

      <Button
        loading={form.loading}
        iconRight="arrow-right-line"
        onPress={form.handleSubmission}
      >
        Continue
      </Button>

      <View style={tw`gap-y-2`}>
        <View style={tw`flex-row justify-center`}>
          <Text style={tw`text-center`}>Incorrect email address?&nbsp;</Text>
          <Hyperlink
            color="primary"
            onPress={onLogout}
            disabled={logoutMutation.isLoading}
          >
            Sign out
          </Hyperlink>
        </View>

        <View style={tw`flex-row justify-center`}>
          <Text style={tw`text-center`}>Didn't receive a code?&nbsp;</Text>
          <Hyperlink color="primary" onPress={resendVerificationEmail}>
            Resend
          </Hyperlink>
        </View>
      </View>
    </>
  );
};

export default VerificationView;

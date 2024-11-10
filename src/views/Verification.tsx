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
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Hyperlink from "@/ui/Hyperlink";
import FormField from "@/ui/FormField";
import useFormMutation from "@/hooks/useFormMutation";

const VerificationView = () => {
  const logoutMutation = useLogout();
  const verifyMutation = useVerifyEmail();
  const resendMutation = useResendVerification();

  const formValidators = {
    code: z.string().length(6, { message: "Invalid verification code" }),
  };

  const form = useFormMutation({
    mutation: verifyMutation,
    validators: formValidators,
    onSuccess: async ({ data }) => {
      Toast.show({
        type: "success",
        text1: "Successfully verified chapter",
        text2: "Your chapter has been successfully verified",
      });
    },
  });

  const resendVerificationEmail = async () => {
    await resendMutation.mutateAsync();

    Toast.show({
      type: "success",
      text1: "Successfully resent verification email",
      text2: "A new verification email has been sent",
    });
  };

  const onLogout = async () => {
    await logoutMutation.mutateAsync();
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
            disabled={logoutMutation.isPending}
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

/*
 * Created on Fri Feb 23 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import tw from "@/lib/tailwind";
import Button from "@/ui/Button";
import Hyperlink from "@/ui/Hyperlink";
import FormField from "@/ui/FormField";
import { useLogin } from "@/hooks/api/auth";
import validators from "@/constants/validators";
import useFormMutation from "@/hooks/useFormMutation";
import type { AuthStackHook } from "@/navigation/@types";
import TermsAndConditions from "@/components/TermsAndConditions";

const LoginView = () => {
  const mutation = useLogin();
  const navigation = useNavigation<AuthStackHook>();

  const formValidators = {
    email: validators.email,
    password: validators.password,
  };

  const form = useFormMutation({
    mutation,
    validators: formValidators,
  });

  const onForgotPasswordPress = () => {
    navigation.navigate("ForgotPasswordStep1");
  };

  return (
    <View style={tw`justify-between w-full flex-1`}>
      <View style={tw`gap-y-3 flex-col items-center`}>
        <FormField
          placeholder="Email"
          error={form.state.email.error}
          value={form.state.email.value}
          onChangeText={form.setValue.bind(null, "email")}
        />
        <FormField
          secureTextEntry
          placeholder="Password"
          error={form.state.password.error}
          value={form.state.password.value}
          onChangeText={form.setValue.bind(null, "password")}
        />
        <Button
          loading={form.loading}
          iconRight="ArrowRight"
          onPress={form.handleSubmission}
        >
          Continue
        </Button>

        <Hyperlink onPress={onForgotPasswordPress}>
          Forgot your password?
        </Hyperlink>
      </View>

      <TermsAndConditions />
    </View>
  );
};

export default LoginView;

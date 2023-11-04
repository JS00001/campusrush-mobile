/*
 * Created on Mon Aug 07 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { View } from "react-native";

import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import Hyperlink from "@/ui/Hyperlink";
import useVerification from "@/hooks/useVerification";

const Verification = () => {
  const {
    errors,
    isLoading,
    code,
    setCode,
    validateFields,
    handleSubmission,
    resendVerificationEmail,
  } = useVerification();

  // Handle the submission of the form
  const onSubmit = () => {
    // Ensure the fields are valid
    const isValid = validateFields(["code"]);
    // If the fields are not valid, dont submit the final request
    if (!isValid) return;
    // Submit the final request if the fields are valid
    handleSubmission();
  };

  return (
    <Layout scrollable gap={18}>
      <Layout.Header
        title="Verification"
        subtitle="You must have a verified email to continue"
      />
      <TextInput
        error={errors.code}
        placeholder="Verification Code"
        value={code}
        onChangeText={setCode}
      />

      <Button
        loading={isLoading}
        iconRight="ri-arrow-right-line"
        onPress={onSubmit}
      >
        Continue
      </Button>

      <View style={tw`flex-row justify-center`}>
        <Text style={tw`text-center`}>Didn't receive a code?&nbsp;</Text>
        <Hyperlink color="dark" onPress={resendVerificationEmail}>
          Resend
        </Hyperlink>
      </View>
    </Layout>
  );
};

export default Verification;

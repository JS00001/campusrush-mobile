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
    isLoading,
    code,
    setCode,
    handleSubmission,
    resendVerificationEmail,
  } = useVerification();

  return (
    <Layout scrollable gap={18}>
      <Layout.Header
        title="Verification"
        subtitle="You must have a verified email to continue"
      />
      <TextInput
        placeholder="Verification Code"
        value={code}
        onChangeText={setCode}
      />

      <Button
        loading={isLoading}
        iconRight="ri-arrow-right-line"
        onPress={handleSubmission}
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

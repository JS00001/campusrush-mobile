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

import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";

import useLogin from "@/hooks/auth/useLogin";
import TermsAndConditions from "@/components/TermsAndConditions";

const Login = () => {
  const {
    errors,
    isLoading,
    email,
    password,
    setEmail,
    setPassword,
    handleSubmission,
  } = useLogin();

  return (
    <Layout scrollable keyboardAvoiding gap={18}>
      <Layout.Header
        hasBackButton
        title="Login"
        subtitle="Login as an chapter"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        error={errors.password}
      />
      <Button
        loading={isLoading}
        iconRight="ri-arrow-right-line"
        onPress={handleSubmission}
      >
        Continue
      </Button>

      <TermsAndConditions />
    </Layout>
  );
};

export default Login;

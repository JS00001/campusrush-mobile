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

import useLogin from "@/hooks/useLogin";

const Login = () => {
  const {
    isLoading,
    email,
    password,
    setEmail,
    setPassword,
    handleSubmission,
  } = useLogin();

  return (
    <Layout
      scrollable
      flexGap="18px"
      header={{
        hasBackButton: true,
        title: "Login",
        subtitle: "Login as an organization",
      }}
    >
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Button iconRight="ri-arrow-right-line" onPress={handleSubmission}>
        Continue
      </Button>
    </Layout>
  );
};

export default Login;

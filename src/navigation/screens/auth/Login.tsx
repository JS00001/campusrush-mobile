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

import { useState } from "react";

import Layout from "@/ui/Layout";
1;
import TextInput from "@/ui/TextInput";
import Button from "@/ui/Button";
import { KeyboardAvoidingView } from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button iconRight="ri-arrow-right-line">Continue</Button>
    </Layout>
  );
};

export default Login;

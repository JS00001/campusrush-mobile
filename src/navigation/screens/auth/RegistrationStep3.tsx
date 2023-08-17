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
import { useRegistration } from "@/providers/Registration";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface RegistrationProps {
  navigation: NativeStackNavigationProp<any>;
}

const RegistrationStep3: React.FC<RegistrationProps> = ({ navigation }) => {
  const {
    handleSubmission,
    isLoading,
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
  } = useRegistration();

  const onComplete = () => {
    handleSubmission();
  };

  return (
    <Layout scrollable gap={18} hasTermsAndConditions>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Choose a secure password"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <Button iconRight="ri-arrow-right-line" onPress={onComplete}>
        Complete Registration
      </Button>
    </Layout>
  );
};

export default RegistrationStep3;

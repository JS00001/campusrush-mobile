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

const RegistrationStep2: React.FC<RegistrationProps> = ({ navigation }) => {
  const {
    isLoading,
    email,
    firstName,
    lastName,
    setEmail,
    setFirstName,
    setLastName,
  } = useRegistration();

  const onContinue = () => {
    navigation.navigate("RegistrationStep3");
  };

  return (
    <Layout scrollable gap={18} hasTermsAndConditions>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Please provide your personal details"
      />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <Button iconRight="ri-arrow-right-line" onPress={onContinue}>
        Continue
      </Button>
    </Layout>
  );
};

export default RegistrationStep2;

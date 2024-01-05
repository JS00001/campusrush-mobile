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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import usePosthog from "@/hooks/usePosthog";
import useRegistration from "@/hooks/useRegistration";
import TermsAndConditions from "@/components/TermsAndConditions";

interface RegistrationProps {
  navigation: NativeStackNavigationProp<any>;
}

const RegistrationStep2: React.FC<RegistrationProps> = ({ navigation }) => {
  const {
    email,
    firstName,
    lastName,
    errors,
    isLoading,
    setField,
    validateEmail,
    validateFields,
  } = useRegistration();

  const posthog = usePosthog();

  // Handle the submission of the form
  const onContinue = async () => {
    // Ensure the fields are valid
    const isValid = validateFields(["email", "firstName", "lastName"]);
    // If the fields are not valid, dont navigate to the next screen
    if (!isValid) return;

    // Validate the email
    const isValidEmail = await validateEmail(email);
    // If the email is not valid, dont navigate to the next screen
    if (!isValidEmail) return;

    // Capture the event in analytics
    posthog.capture("complete_registration_step_2", {
      email,
      firstName,
      lastName,
    });

    // Navigate to the next screen if the fields are valid
    navigation.navigate("RegistrationStep3");
  };

  return (
    <Layout scrollable keyboardAvoiding gap={18}>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Please provide your personal details"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setField.bind(null, "email")}
        error={errors.email}
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setField.bind(null, "firstName")}
        error={errors.firstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setField.bind(null, "lastName")}
        error={errors.lastName}
      />

      <Button
        loading={isLoading}
        onPress={onContinue}
        iconRight="ri-arrow-right-line"
      >
        Continue
      </Button>

      <TermsAndConditions />
    </Layout>
  );
};

export default RegistrationStep2;

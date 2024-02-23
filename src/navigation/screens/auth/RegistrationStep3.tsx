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
import usePosthog from "@/hooksv1/usePosthog";
import useRegistration from "@/hooksv1/auth/useRegistration";
import TermsAndConditions from "@/components/TermsAndConditions";

const RegistrationStep3: React.FC = () => {
  const {
    errors,
    password,
    isLoading,
    confirmPassword,
    setField,
    validateFields,
    handleSubmission,
  } = useRegistration();

  const posthog = usePosthog();

  // Handle the submission of the form
  const onComplete = () => {
    // Ensure the fields are valid
    const isValid = validateFields(["password", "confirmPassword"]);
    // If the fields are not valid, dont submit the final request
    if (!isValid) return;

    // Capture the event in analytics
    posthog.capture("complete_registration");

    // Submit the final request if the fields are valid
    handleSubmission();
  };

  return (
    <Layout scrollable keyboardAvoiding gap={18}>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Choose a secure password"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setField.bind(null, "password")}
        secureTextEntry
        error={errors.password}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setField.bind(null, "confirmPassword")}
        secureTextEntry
        error={errors.confirmPassword}
      />

      <Button
        loading={isLoading}
        onPress={onComplete}
        iconRight="ri-arrow-right-line"
      >
        Complete Registration
      </Button>

      <TermsAndConditions />
    </Layout>
  );
};

export default RegistrationStep3;

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

const RegistrationStep3: React.FC = () => {
  // Import the context from the RegistrationProvider
  const {
    // Status fields
    errors,
    validateFields,
    // Form Methods
    handleSubmission,
    // Form values
    password,
    confirmPassword,
    // Form Methods
    setPassword,
    setConfirmPassword,
  } = useRegistration();

  // Handle the submission of the form
  const onComplete = () => {
    // Ensure the fields are valid
    const isValid = validateFields(["password", "confirmPassword"]);
    // If the fields are not valid, dont submit the final request
    if (!isValid) return;
    // Submit the final request if the fields are valid
    handleSubmission();
  };

  return (
    <Layout scrollable keyboardAvoiding gap={18} hasTermsAndConditions>
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
        error={errors.password}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        error={errors.confirmPassword}
      />

      <Button iconRight="ri-arrow-right-line" onPress={onComplete}>
        Complete Registration
      </Button>
    </Layout>
  );
};

export default RegistrationStep3;

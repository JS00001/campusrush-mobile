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
import useSettings from "@/hooksv1/useSettings";

const UpdateGeneral: React.FC = () => {
  const {
    email,
    firstName,
    lastName,
    setEmail,
    setFirstName,
    setLastName,
    errors,
    isLoading,
    handleSubmission,
    validateFields,
  } = useSettings();

  // Handle the submission of the form
  const onSave = () => {
    // Ensure the fields are valid
    const isValid = validateFields(["email", "firstName", "lastName"]);
    // If the fields are not valid, dont navigate to the next screen
    if (!isValid) return;
    // Handle the submission of the form
    handleSubmission();
  };

  return (
    <Layout scrollable>
      <Layout.Header
        hasBackButton
        title="General"
        subtitle="Update general information"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        error={errors.email}
      />
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        error={errors.firstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        error={errors.lastName}
      />

      <Button onPress={onSave} loading={isLoading}>
        Save Changes
      </Button>
    </Layout>
  );
};

export default UpdateGeneral;

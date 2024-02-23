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

import Button from "@/ui/Button";
import Layout from "@/ui/Layout";
import TextInput from "@/ui/TextInput";
import useSettings from "@/hooksv1/useSettings";

const UpdateSecurity: React.FC = () => {
  const {
    currentPassword,
    newPassword,
    confirmNewPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmNewPassword,
    errors,
    isLoading,
    handleSubmission,
    validateFields,
  } = useSettings();

  // Handle the submission of the form
  const onSave = () => {
    // Ensure the fields are valid
    const isValid = validateFields([
      "currentPassword",
      "newPassword",
      "confirmNewPassword",
    ]);
    // If the fields are not valid, dont navigate to the next screen
    if (!isValid) return;
    // Handle the submission of the form
    handleSubmission();
  };

  return (
    <Layout scrollable>
      <Layout.Header
        hasBackButton
        title="Security"
        subtitle="Update security information"
      />

      <TextInput
        secureTextEntry
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        error={errors.currentPassword}
      />
      <TextInput
        secureTextEntry
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        error={errors.newPassword}
      />
      <TextInput
        secureTextEntry
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        error={errors.confirmNewPassword}
      />

      <Button onPress={onSave} loading={isLoading}>
        Save Changes
      </Button>
    </Layout>
  );
};

export default UpdateSecurity;

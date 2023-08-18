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
import Autocomplete from "@/ui/Autocomplete";
import { useRegistration } from "@/providers/Registration";

interface RegistrationProps {
  navigation: NativeStackNavigationProp<any>;
}

const RegistrationStep1: React.FC<RegistrationProps> = ({ navigation }) => {
  // Import the context from the RegistrationProvider
  const {
    // Status fields
    errors,
    validateFields,
    // Form values
    name,
    school,
    schools,
    organizations,
    // Form Methods
    setName,
    setSchool,
  } = useRegistration();

  // Handle the submission of the form
  const onContinue = () => {
    // Ensure the fields are valid
    const isValid = validateFields(["name", "school"]);
    // If the fields are not valid, dont navigate to the next screen
    if (!isValid) return;
    // Navigate to the next screen if the fields are valid
    navigation.navigate("RegistrationStep2");
  };

  return (
    <Layout gap={18} hasTermsAndConditions>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Please provide your organizations information"
      />

      <Autocomplete
        placeholder="School Name"
        options={schools}
        value={school}
        onChangeText={setSchool}
        error={errors.school}
      />

      <Autocomplete
        placeholder="Organization Name"
        options={organizations}
        value={name}
        onChangeText={setName}
        error={errors.name}
      />

      <Button iconRight="ri-arrow-right-line" onPress={onContinue}>
        Continue
      </Button>
    </Layout>
  );
};

export default RegistrationStep1;

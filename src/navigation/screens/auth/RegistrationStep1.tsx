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
import Dropdown from "@/ui/Dropdown";
import schools from "@/constants/schools";
import organizations from "@/constants/organizations";
import useRegistration from "@/hooks/useRegistration";
import TermsAndConditions from "@/components/TermsAndConditions";

interface RegistrationProps {
  navigation: NativeStackNavigationProp<any>;
}

const RegistrationStep1: React.FC<RegistrationProps> = ({ navigation }) => {
  const { name, school, errors, isLoading, setField, validateFields } =
    useRegistration();

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
    <Layout gap={18} keyboardAvoiding>
      <Layout.Header
        hasBackButton
        title="Register"
        subtitle="Please provide your organizations information"
      />
      <Dropdown
        searchable
        placeholder="School Name"
        options={schools}
        value={school}
        onValueChange={setField.bind(null, "school")}
        error={errors.school}
      />

      <Dropdown
        searchable
        placeholder="Organization Name"
        options={organizations}
        value={name}
        onValueChange={setField.bind(null, "name")}
        error={errors.name}
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

export default RegistrationStep1;

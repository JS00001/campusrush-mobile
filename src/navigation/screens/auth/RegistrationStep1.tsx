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
import Autocomplete from "@/ui/Autocomplete";
import { useRegistration } from "@/providers/Registration";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface RegistrationProps {
  navigation: NativeStackNavigationProp<any>;
}

const RegistrationStep1: React.FC<RegistrationProps> = ({ navigation }) => {
  const {
    isLoading,
    schools,
    organizations,
    schoolName,
    organizationName,
    setOrganizationName,
    setSchoolName,
  } = useRegistration();

  const onContinue = () => {
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
        options={schools || []}
        value={schoolName}
        onChangeText={setSchoolName}
      />

      <Autocomplete
        placeholder="Organization Name"
        options={organizations || []}
        value={organizationName}
        onChangeText={setOrganizationName}
      />

      <Button iconRight="ri-arrow-right-line" onPress={onContinue}>
        Continue
      </Button>
    </Layout>
  );
};

export default RegistrationStep1;

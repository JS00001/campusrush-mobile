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

import { useState } from "react";

import Layout from "@/ui/Layout";
import Button from "@/ui/Button";
import TextInput from "@/ui/TextInput";
import { useRegistration } from "@/providers/Registration";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Autocomplete from "@/ui/Autocomplete";

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
    <Layout
      scrollable
      flexGap="18px"
      header={{
        hasBackButton: true,
        cta: "Step 1/3",
        title: "Register",
        subtitle: "Please provide your organizations information",
      }}
      termsAndConditions={{
        shown: true,
      }}
    >
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

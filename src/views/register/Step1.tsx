/*
 * Created on Sat Feb 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { z } from "zod";
import { useNavigation } from "@react-navigation/native";

import Button from "@/ui/Button";
import Dropdown from "@/ui/Dropdown";
import useForm from "@/hooks/useForm";
import { useRegistrationStore } from "@/store";
import TermsAndConditions from "@/components/TermsAndConditions";

import schools from "@/constants/schools";
import chapters from "@/constants/chapters";

const RegistrationStep1View = () => {
  const navigation = useNavigation();
  const store = useRegistrationStore();

  const formValidators = {
    name: z.enum(chapters as [string, ...string[]], {
      required_error: "This field is required.",
    }),
    school: z.enum(schools as [string, ...string[]], {
      required_error: "This field is required.",
    }),
  };

  const form = useForm({
    validators: formValidators,
    initialValues: {
      name: store.name,
      school: store.school,
    },
  });

  const handleSubmission = () => {
    const isValid = form.validateState();

    if (!isValid) {
      return;
    }

    store.setField("name", form.state.name.value);
    store.setField("school", form.state.school.value);
    (navigation.navigate as any)("RegistrationStep2");
  };

  return (
    <>
      <Dropdown
        searchable
        placeholder="School Name"
        options={schools}
        value={form.state.school.value}
        error={form.state.school.error}
        onValueChange={form.setValue.bind(null, "school")}
      />

      <Dropdown
        searchable
        placeholder="Chapter Name"
        options={chapters}
        value={form.state.name.value}
        error={form.state.name.error}
        onValueChange={form.setValue.bind(null, "name")}
      />

      <Button onPress={handleSubmission} iconRight="ri-arrow-right-line">
        Continue
      </Button>

      <TermsAndConditions />
    </>
  );
};

export default RegistrationStep1View;

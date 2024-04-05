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
import { usePostHog } from "posthog-react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "@/ui/Button";
import Select from "@/ui/Select";
import useForm from "@/hooks/useForm";
import { handle } from "@/lib/util/error";
import { useRegistrationStore } from "@/store";
import TermsAndConditions from "@/components/TermsAndConditions";

import schools from "@/constants/schools";
import chapters from "@/constants/chapters";

const RegistrationStep1View = () => {
  const posthog = usePostHog();
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

    handle(() => {
      posthog?.capture("REGISTRATION_STEP_1_COMPLETED", {
        chapter_name: form.state.name.value,
        chapter_school: form.state.school.value,
      });
    });

    (navigation.navigate as any)("RegistrationStep2");
  };

  return (
    <>
      <Select
        searchable
        placeholder="School Name"
        options={schools}
        value={form.state.school.value}
        error={form.state.school.error}
        onChange={form.setValue.bind(null, "school")}
      />

      <Select
        searchable
        placeholder="Chapter Name"
        options={chapters}
        value={form.state.name.value}
        error={form.state.name.error}
        onChange={form.setValue.bind(null, "name")}
      />

      <Button onPress={handleSubmission} iconRight="arrow-right-line">
        Continue
      </Button>

      <TermsAndConditions />
    </>
  );
};

export default RegistrationStep1View;

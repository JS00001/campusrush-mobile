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

const RegistrationStep1 = () => {
  const [school, setSchool] = useState("");
  const [organization, setOrganization] = useState("");

  return (
    <Layout
      scrollable
      flexGap="18px"
      header={{
        hasBackButton: true,
        cta: "Step 1/5",
        title: "Register",
        subtitle: "Please provide your organizations information",
      }}
    >
      <TextInput
        placeholder="School Name"
        value={school}
        onChangeText={setSchool}
      />
      <TextInput
        placeholder="Organization Name"
        value={organization}
        onChangeText={setOrganization}
      />
      <Button iconRight="ri-arrow-right-line">Continue</Button>
    </Layout>
  );
};

export default RegistrationStep1;

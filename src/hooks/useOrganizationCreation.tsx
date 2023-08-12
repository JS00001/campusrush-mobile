/*
 * Created on Fri Aug 11 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";

import authAPI from "@/api/auth";

const useOrganizationCreation = () => {
  const query = useQuery({
    queryKey: ["getOrganizations"],
    queryFn: () => {
      return authAPI.getOrganizations();
    },
  });

  const form = useFormik({
    initialValues: {
      schoolName: "",
      organizationName: "",
    },
    onSubmit: (values) => {
      // Store logic
    },
  });

  return {
    ...query,
    schools: query?.data?.data?.data.schools,
    organizations: query?.data?.data?.data.organizations,
    schoolName: form.values.schoolName,
    organizationName: form.values.organizationName,
    setSchoolName: form.setFieldValue.bind(null, "schoolName"),
    setOrganizationName: form.setFieldValue.bind(null, "organizationName"),
  };
};

export default useOrganizationCreation;

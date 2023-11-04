/*
 * Created on Sat Nov 04 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { FormikHelpers } from "formik";

interface FormValidationResult<T> {
  /**
   * The values of the form
   */
  values: T;
  /**
   * The fields to validate
   */
  fields: (keyof T)[];
  /**
   * The formik form instance
   */
  form: FormikHelpers<T>;
  /**
   * The validation function
   */
  validatorFn: (values: T) => Partial<Record<keyof T, string>>;
}

const validateFields = <T,>({
  fields,
  values,
  form,
  validatorFn,
}: FormValidationResult<T>): boolean => {
  // Check if there are any errors
  const errors = validatorFn(values) as any;

  // Filter out errors that are not in the fields to validate
  Object.keys(errors).forEach((key) => {
    if (!fields.includes(key as keyof T)) {
      delete errors[key];
    }
  });

  // Set the errors in the form
  fields.forEach((field) => {
    if (errors[field]) {
      form.setFieldError(field as string, errors[field]);
    } else {
      form.setFieldError(field as string, "");
    }
  });

  // Check if there are any errors
  const hasErrors = !Object.values(errors).some((error) => error !== "");

  return hasErrors;
};

export default validateFields;

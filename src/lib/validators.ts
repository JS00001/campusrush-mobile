/*
 * Created on Fri Aug 18 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

const validateRegistration = (
  input: RegisterAsOrganizationInput,
  organizations: string[],
  schools: string[],
) => {
  const errors = {
    name: '',
    school: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  };

  if (!input.name) {
    errors.name = 'Organization is required';
  }

  if (!input.school) {
    errors.school = 'School is required';
  }

  if (!input.email) {
    errors.email = 'Email is required';
  }

  if (!input.password) {
    errors.password = 'Password is required';
  }

  if (!input.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  }

  if (input.password !== input.confirmPassword) {
    if (!errors.password && !errors.confirmPassword) {
      errors.password = 'Passwords do not match';
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  if (!input.firstName) {
    errors.firstName = 'First name is required';
  }

  if (!input.lastName) {
    errors.lastName = 'Last name is required';
  }

  // Validate email is a valid email
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(input.email)) {
    if (!errors.email) errors.email = 'Invalid email address';
  }

  // Validate password is at least 6 characters
  if (input.password.length < 6) {
    if (!errors.password) errors.password = 'Password too short';
  }

  // Validate name only has letters
  const nameRegex = /^[a-zA-Z]+$/;

  if (!nameRegex.test(input.firstName)) {
    if (!errors.firstName) errors.firstName = 'Invalid first name';
  }

  if (!nameRegex.test(input.lastName)) {
    if (!errors.lastName) errors.lastName = 'Invalid last name';
  }

  // Validate organization name is a valid organization name
  if (!organizations.includes(input.name)) {
    if (!errors.name) errors.name = 'Invalid organization';
  }

  // Validate school name is a valid school name
  if (!schools.includes(input.school)) {
    if (!errors.school) errors.school = 'Invalid school name';
  }

  // Check if all errors are empty
  // If so, return an empty object
  const allErrors = Object.values(errors).filter((error) => error !== '');

  if (allErrors.length === 0) {
    return {} as RegisterAsOrganizationInput;
  }

  return errors;
};

const validateLogin = (input: LoginAsOrganizationInput) => {
  const errors = {
    email: '',
    password: '',
  };

  if (!input.email) {
    errors.email = 'Email is required';
  }

  if (!input.password) {
    errors.password = 'Password is required';
  }

  // Validate email is a valid email
  const emailRegex = /\S+@\S+\.\S+/;

  if (!emailRegex.test(input.email)) {
    if (!errors.email) errors.email = 'Invalid email address';
  }

  // Check if all errors are empty
  // If so, return an empty object
  const allErrors = Object.values(errors).filter((error) => error !== '');

  if (allErrors.length === 0) {
    return {} as LoginAsOrganizationInput;
  }

  return errors;
};

export default {
  validateLogin,
  validateRegistration,
};

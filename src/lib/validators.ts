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
    errors.confirmPassword = 'Passwords do not match';
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
    errors.email = 'Invalid email address';
  }

  // Validate password is at least 6 characters
  if (input.password.length < 6) {
    errors.password = 'Password too short';
  }

  // Validate name only has letters
  const nameRegex = /^[a-zA-Z]+$/;

  if (!nameRegex.test(input.firstName)) {
    errors.firstName = 'Invalid first name';
  }

  if (!nameRegex.test(input.lastName)) {
    errors.lastName = 'Invalid last name';
  }

  // Validate organization name is a valid organization name
  if (!organizations.includes(input.name)) {
    errors.name = 'Invalid organization';
  }

  // Validate school name is a valid school name
  if (!schools.includes(input.school)) {
    errors.school = 'Invalid school name';
  }

  return errors;
};

export default {
  validateRegistration,
};

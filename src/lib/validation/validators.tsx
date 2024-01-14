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

import {
  namesRegex,
  emailRegex,
  phoneRegex,
  socialMediaRegex,
  verificationCodeRegex,
} from "@/constants/regex";
import schools from "@/constants/schools";
import chapters from "@/constants/chapters";

const validateRegistration = (input: RegisterAsChapterInput) => {
  const errors = {
    name: "",
    school: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  };

  if (!input.name) {
    errors.name = "Chapter is required";
  }

  if (!input.school) {
    errors.school = "School is required";
  }

  if (!input.email) {
    errors.email = "Email is required";
  }

  if (!input.password) {
    errors.password = "Password is required";
  }

  if (!input.confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  }

  if (input.password !== input.confirmPassword) {
    if (!errors.password && !errors.confirmPassword) {
      errors.password = "Passwords do not match";
      errors.confirmPassword = "Passwords do not match";
    }
  }

  if (!input.firstName) {
    errors.firstName = "First name is required";
  }

  if (!input.lastName) {
    errors.lastName = "Last name is required";
  }

  // Validate email is a valid email
  if (!emailRegex.test(input.email)) {
    if (!errors.email) errors.email = "Invalid email address";
  }

  // Validate password is at least 6 characters
  if (input.password.length < 6) {
    if (!errors.password) errors.password = "Password too short";
  }

  if (!namesRegex.test(input.firstName)) {
    if (!errors.firstName) errors.firstName = "Invalid first name";
  }

  if (!namesRegex.test(input.lastName)) {
    if (!errors.lastName) errors.lastName = "Invalid last name";
  }

  // Validate chapter name is a valid chapter name
  if (!chapters.includes(input.name)) {
    if (!errors.name) errors.name = "Invalid chapter";
  }

  // Validate school name is a valid school name
  if (!schools.includes(input.school)) {
    if (!errors.school) errors.school = "Invalid school name";
  }

  // Check if all errors are empty
  // If so, return an empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {} as RegisterAsChapterInput;
  }

  return errors;
};

const validateLogin = (input: LoginAsChapterInput) => {
  const errors = {
    email: "",
    password: "",
  };

  if (!input.email) {
    errors.email = "Email is required";
  }

  if (!input.password) {
    errors.password = "Password is required";
  }

  if (!emailRegex.test(input.email)) {
    if (!errors.email) errors.email = "Invalid email address";
  }

  // Check if all errors are empty
  // If so, return an empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {} as LoginAsChapterInput;
  }

  return errors;
};

const validateSettings = (input: UpdateChapterInput) => {
  const errors = {
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  if (!input.currentPassword) {
    errors.currentPassword = "Current password is required";
  }

  if (!input.newPassword) {
    errors.newPassword = "Password is required";
  }

  if (!input.confirmNewPassword) {
    errors.confirmNewPassword = "Password is required";
  }

  if (input.newPassword !== input.confirmNewPassword) {
    if (!errors.newPassword && !errors.confirmNewPassword) {
      errors.newPassword = "Passwords do not match";
      errors.confirmNewPassword = "Passwords do not match";
    }
  }

  if (!namesRegex.test(input.firstName || "")) {
    if (!errors.firstName) errors.firstName = "Invalid first name";
  }

  if (!namesRegex.test(input.lastName || "")) {
    if (!errors.lastName) errors.lastName = "Invalid last name";
  }

  if (!emailRegex.test(input.email || "")) {
    if (!errors.email) errors.email = "Invalid email address";
  }

  // Validate password is at least 6 characters
  if (input.newPassword && input.newPassword.length < 6) {
    if (!errors.newPassword) errors.newPassword = "Password too short";
  }

  // Check if all errors are empty
  // If so, return an empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {} as UpdateChapterInput;
  }

  return errors;
};

const validateCreatePnm = (input: CreatePnmInput) => {
  const errors = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    classification: "",
    instagram: "",
    snapchat: "",
  };

  if (!input.firstName) {
    errors.firstName = "First name is required";
  }

  if (!input.lastName) {
    errors.lastName = "Last name is required";
  }

  if (!input.phoneNumber) {
    errors.phoneNumber = "Phone number is required";
  }

  if (!input.classification) {
    errors.classification = "Classification is required";
  }

  if (input.firstName && !namesRegex.test(input.firstName)) {
    if (!errors.firstName) errors.firstName = "Invalid first name";
  }

  if (input.lastName && !namesRegex.test(input.lastName)) {
    if (!errors.lastName) errors.lastName = "Invalid last name";
  }

  if (input.phoneNumber && !phoneRegex.test(input.phoneNumber)) {
    if (!errors.phoneNumber) errors.phoneNumber = "Invalid phone number";
  }

  // Check if all errors are empty
  // If so, return an empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {} as CreatePnmInput;
  }

  return errors;
};

const validateUpdatePnm = (input: UpdatePnmInput) => {
  const errors = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    classification: "",
    instagram: "",
    snapchat: "",
  };

  if (input.firstName && !namesRegex.test(input.firstName)) {
    if (!errors.firstName) errors.firstName = "Invalid first name";
  }

  if (input.lastName && !namesRegex.test(input.lastName)) {
    if (!errors.lastName) errors.lastName = "Invalid last name";
  }

  if (input.phoneNumber && !phoneRegex.test(input.phoneNumber)) {
    if (!errors.phoneNumber) errors.phoneNumber = "Invalid phone number";
  }

  if (input.classification && !namesRegex.test(input.classification)) {
    if (!errors.classification)
      errors.classification = "Invalid classification";
  }

  if (input.instagram && !socialMediaRegex.test(input.instagram)) {
    if (!errors.instagram) errors.instagram = "Invalid username";
  }

  if (input.snapchat && !socialMediaRegex.test(input.snapchat)) {
    if (!errors.snapchat) errors.snapchat = "Invalid username";
  }

  // Check if all errors are empty
  // If so, return an empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {};
  }

  return errors;
};

const validateVerifyChapter = (input: VerifyChapterInput) => {
  const errors = {
    code: "",
  };

  if (!input.code) {
    errors.code = "Code is required";
  }

  if (input.code && !verificationCodeRegex.test(input.code)) {
    if (!errors.code) errors.code = "Invalid code";
  }

  // Check if all errors are empty
  // If so, return an empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {} as VerifyChapterInput;
  }

  return errors;
};

const validateCreateEvent = (input: CreateEventInput) => {
  const errors = {
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
  };

  if (!input.title) {
    errors.title = "Title is required";
  }

  if (!input.description) {
    errors.description = "Description is required";
  }

  if (!input.location) {
    errors.location = "Location is required";
  }

  if (!input.startDate) {
    errors.startDate = "Start date is required";
  }

  if (!input.endDate) {
    errors.endDate = "End date is required";
  }

  // Validate start date is before end date
  if (input.startDate && input.endDate) {
    const startDate = new Date(parseInt(input.startDate));
    const endDate = new Date(parseInt(input.endDate));

    if (startDate >= endDate) {
      if (!errors.endDate) {
        errors.endDate = "End date must be after start date";
      }
    }
  }

  // Check if all errors are empty
  // If so, return an empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {} as CreateEventInput;
  }

  return errors;
};

export default {
  validateLogin,
  validateRegistration,
  validateSettings,
  validateCreatePnm,
  validateUpdatePnm,
  validateCreateEvent,
  validateVerifyChapter,
};

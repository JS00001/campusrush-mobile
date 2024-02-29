/*
 * Created on Thu Feb 01 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { z } from 'zod';

const validators = {
  /**
   * MongoDB ObjectID
   */
  objectId: z
    .string({
      required_error: 'ID is required',
      invalid_type_error: 'ID must be a string',
    })
    .regex(/^[a-fA-F0-9]{24}$/, {
      message: 'ID must be a valid ObjectID or UUID',
    })
    .or(
      z
        .string({
          required_error: 'ID is required',
          invalid_type_error: 'ID must be a string',
        })
        .uuid({
          message: 'ID must be a valid ObjectID or UUID',
        }),
    ),
  /**
   * Validates user emails
   */
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({
      message: 'Email must be a valid email address',
    })
    .toLowerCase(),
  /**
   * Validates user first names
   */
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .min(1, {
      message: 'Name must be at least 1 character',
    })
    .max(32, {
      message: 'Name must be at most 32 characters',
    }),
  /**
   * Validates user last names
   */
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(1, {
      message: 'Name must be at least 1 character',
    })
    .max(48, {
      message: 'Name must be at most 48 characters',
    }),
  /**
   * Validates user passwords as a string between 6 and 64 characters
   */
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, {
      message: 'Password must be at least 8 characters',
    })
    .max(128, {
      message: 'Password must be at most 128 characters',
    }),
  /**
   * Validates phone numbers as a 10 digit number
   */
  phoneNumber: z
    .string({
      required_error: 'Phone number is required',
      invalid_type_error: 'Phone number must be a string',
    })
    .regex(/^(\+1)?\d{10}$/, {
      message: 'Phone number must be a 10 digit number',
    }),
  /**
   * Validates user content that is a short string
   */
  shortContentString: z
    .string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string',
    })
    .min(1, {
      message: 'Must be at least 1 character',
    })
    .max(128, {
      message: 'Must be at most 128 characters',
    }),
  /**
   * Validates user content that is a long string
   */
  longContentString: z
    .string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string',
    })
    .min(1, {
      message: 'Must be at least 1 character',
    })
    .max(1024, {
      message: 'Must be at most 1024 characters',
    }),
  /**
   * Pagination offset
   */
  paginationOffset: z.coerce
    .number({
      required_error: 'Offset is required',
      invalid_type_error: 'Offset must be a number',
    })
    .gte(0, {
      message: 'Offset must be a positive number',
    }),
  /**
   * An organization's size
   */
  organizationSize: z.enum(['01_25', '26_50', '51_100', '100_PLUS'], {
    invalid_type_error: 'Size must be a valid organization size',
    required_error: 'Size is required',
  }),
};

export default validators;

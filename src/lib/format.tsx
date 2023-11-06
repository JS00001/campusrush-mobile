/*
 * Created on Mon Nov 06 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

export const formatPhoneNumber = (phoneNumber: string) => {
  // Phone number should be in the format of +11234567890 and should convert to (123) 456-7890
  let formattedPhoneNumber = phoneNumber;

  // If no phone number, return empty string
  if (!phoneNumber) return "";

  if (phoneNumber.length === 12) {
    formattedPhoneNumber = `(${phoneNumber.substring(
      2,
      5,
    )}) ${phoneNumber.substring(5, 8)}-${phoneNumber.substring(8, 12)}`;
  }

  return formattedPhoneNumber;
};

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

/**
 * Ensure a string is a valid JSON string and pretty prints it
 * if it is valid JSON
 */
export const formatJSON = (string: string) => {
  // Check if string is valid JSON
  try {
    JSON.parse(string);
  } catch (e) {
    return string;
  }

  // If valid JSON, return formatted JSON
  return JSON.stringify(JSON.parse(string), null, 2);
};

/**
 * Ensure a string is a valid JSON string and can be parsed
 */
export const isJSON = (string: string) => {
  let parsedJSON;

  try {
    parsedJSON = JSON.parse(string);
  } catch (e) {
    return { isValid: false };
  }

  return { isValid: true, parsedJSON };
};

/**
 * Take a version like "1.0.0" and convert it to "010000"
 */
export const getComparableVersion = (version: string) => {
  const parts = version.split('.');

  const paddedParts = parts.map((part, index) => {
    if (index === 0) {
      while (part.length < 2) {
        part = '0' + part;
      }
    } else {
      while (part.length < 2) {
        part = part + '0';
      }
    }

    return part;
  });

  return parseInt(paddedParts.join(''));
};

/**
 * Put a string into title case
 */
export const titleCase = (string: string) => {
  return string
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

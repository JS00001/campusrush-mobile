/*
 * Created on Sun Oct 8 2023
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
 * Convert a date to a string in the format "time ago"
 */
export const timeAgo = (date: Date | string): string => {
  const seconds = Math.floor((+new Date() - +new Date(date)) / 1000);
  if (seconds < 29) return 'Just now';

  const intervals = {
    yr: 31536000,
    mo: 2592000,
    wk: 604800,
    day: 86400,
    hr: 3600,
    min: 60,
    sec: 1,
  };

  let counter;

  for (const i in intervals) {
    counter = Math.floor(seconds / intervals[i as keyof typeof intervals]);
    if (counter > 0) {
      if (counter === 1) return `${counter} ${i} ago`;
      else return `${counter} ${i}s ago`;
    }
  }

  return date.toLocaleString();
};

/**
 * Convert a date to a string in the format Month Name Day, Year
 */
export const toString = (date: Date | string): string => {
  if (!date) return '';

  // Check to ensure the date can be parsed
  if (isNaN(new Date(date).getTime())) {
    return '';
  }

  // Convert to Month Name Day, Year
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Check whether the date has passed
 */
export const hasPassed = (date: Date | string) => {
  return new Date(date) < new Date();
};

/**
 * Get a relative date string
 */
const getRelativeDate = (date: Date): string => {
  const dateString = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const yesterday = new Date(Date.now() - 86400000).toLocaleDateString(
    undefined,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );

  if (dateString === today) {
    return 'Today';
  }

  if (dateString === yesterday) {
    return 'Yesterday';
  }

  return dateString;
};

export default {
  timeAgo,
  toString,
  hasPassed,
  getRelativeDate,
};

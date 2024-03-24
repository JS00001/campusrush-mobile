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

// TODO: Make these use export const rather than default exports,
// All other util files use export const

/**
 * Convert a date to a string in the format "time ago"
 */
const timeAgo = (date: Date | string): string => {
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
const toString = (date: Date | string): string => {
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
const hasPassed = (date: Date | string) => {
  return new Date(date) < new Date();
};

export default {
  timeAgo,
  toString,
  hasPassed,
};

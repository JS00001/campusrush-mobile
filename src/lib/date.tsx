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

const timeAgo = (date: Date | string): string => {
  const seconds = Math.floor((+new Date() - +new Date(date)) / 1000);
  if (seconds < 29) return "Just now";

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

const toString = (date: Date | string): string => {
  if (!date) return "";

  // Check to ensure the date can be parsed
  if (isNaN(new Date(date).getTime())) {
    return "";
  }

  // Convert to Month Name Day, Year
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const timeUntil = (date: Date | string) => {
  // calculate how far away it is, only use 1 number if possible,
  // IE: IN 1M, IN 1H, IN 1D, IN 1W, IN 1Y, then we can start using bigger numbers for years
  // If it is in the past, return "PASSED"

  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const seconds = Math.floor(Math.abs(diff) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  let hasPassed = false;
  let isOneDayAway = false;
  let formattedString = "";

  if (diff < 0) {
    if (years >= 1) {
      formattedString = `IN ${years}YR`;
    } else if (months >= 1) {
      formattedString = `IN ${months}MO`;
    } else if (weeks >= 1) {
      formattedString = `IN ${weeks}WK`;
    } else if (days >= 1) {
      formattedString = `IN ${days}DY`;
    } else if (hours >= 1) {
      isOneDayAway = true;
      formattedString = `IN ${hours}HR`;
    } else if (minutes >= 1) {
      isOneDayAway = true;
      formattedString = `IN ${minutes}MIN`;
    } else {
      isOneDayAway = true;
      formattedString = `IN ${seconds}SEC`;
    }
  } else {
    hasPassed = true;
    formattedString = "PASSED";
  }

  return { isOneDayAway, formattedDateString: formattedString, hasPassed };
};

export default {
  timeAgo,
  toString,
  timeUntil,
};

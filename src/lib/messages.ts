/*
 * Created on Mon Mar 04 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type { IMessage } from '@/types';

interface TimestampedMessage extends IMessage {
  date?: string;
  showTimestamp?: boolean;
  showDate?: boolean;
}

/*
  Define a function called groupByDate that takes an array of messages 
  as input and returns an array of timestamped messages.
*/
const groupByDate = (messages: IMessage[]): TimestampedMessage[] => {
  // Initialize a variable to keep track of the previous date.
  let previousDate: string = '';

  // Initialize an array to store the timestamped messages.
  let timestampedMessages: TimestampedMessage[] = [];

  // If the input array is empty, return an empty array.
  if (!messages.length) return [];

  // Retrieve the formatted date string for the first message and set it as the previous date.
  previousDate = parseDate(new Date(messages[0].createdAt));

  // Create a timestamped message for the first message and push it to the result array.
  timestampedMessages.push({
    ...messages[0],
    date: previousDate,
    showTimestamp: true,
    showDate: !(messages.length > 1),
  });

  // Iterate through the rest of the messages.
  for (let i = 1; i < messages.length; i++) {
    const message = messages[i];

    // Retrieve the formatted date string for the current message.
    const dateString = parseDate(new Date(message.createdAt));

    // Make the date string support "Today" and "Yesterday".

    // Create a timestamped message for the current message.
    const timestampedMessage: TimestampedMessage = {
      ...message,
      date: dateString,
      showTimestamp: false,
      showDate: false,
    };

    // Push the current timestamped message to the result array.
    timestampedMessages.push(timestampedMessage);

    // Check if the current date is different from the previous date.
    if (dateString !== previousDate) {
      // If the current date is different, set showDate to true for the previous timestamped message.
      timestampedMessages[i - 1].showDate = true;
    }

    // Check if this is the last message in the array.
    if (i === messages.length - 1) {
      // If it's the last message, set showDate to true for the current timestamped message.
      timestampedMessages[i].showDate = true;
    }

    // Update the previous date to the current date for the next iteration.
    previousDate = dateString;
  }

  // Return the array of timestamped messages.
  return timestampedMessages;
};

// TODO: Make this function a part of the date utility file
/*
  Define a function called parseDate that takes a Date object as input and returns a formatted date string.
*/
const parseDate = (date: Date): string => {
  const dateString = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // If the date is today, return "Today".
  if (
    dateString ===
    new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  ) {
    return 'Today';
  }

  // If the date is yesterday, return "Yesterday".
  if (
    dateString ===
    new Date(Date.now() - 86400000).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  ) {
    return 'Yesterday';
  }

  return dateString;
};

export default { groupByDate };

/*
 * Created on Sun Dec 24 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

export interface FormattedEvent extends Event {
  dateString: string;
  start: {
    time: string;
    month: string;
    day: string;
    weekday: string;
  };
  end: {
    time: string;
    month: string;
    day: string;
    weekday: string;
  };
}

/**
 * Extract date information from an event
 */
const formatEvent = (event?: Event): FormattedEvent | null => {
  if (!event) return null;

  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  const dateString = startDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const startMonth = startDate.toLocaleDateString('en-US', {
    month: 'short',
  });

  const endMonth = endDate.toLocaleDateString('en-US', {
    month: 'short',
  });

  const startDay = startDate.toLocaleDateString('en-US', {
    day: 'numeric',
  });

  const endDay = endDate.toLocaleDateString('en-US', {
    day: 'numeric',
  });

  const startWeekday = startDate
    .toLocaleDateString('en-US', {
      weekday: 'short',
    })
    .slice(0, 3);

  const endWeekday = endDate
    .toLocaleDateString('en-US', {
      weekday: 'short',
    })
    .slice(0, 3);

  const startTime = startDate
    .toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
    })
    .toLowerCase()
    .replace(/\s/g, '')
    .replace(':00', '');

  const endTime = endDate
    .toLocaleTimeString([], {
      hour: 'numeric',
      minute: 'numeric',
    })
    .toLowerCase()
    .replace(/\s/g, '')
    .replace(':00', '');

  return {
    ...event,
    dateString,
    start: {
      time: startTime,
      month: startMonth,
      day: startDay,
      weekday: startWeekday,
    },
    end: {
      time: endTime,
      month: endMonth,
      day: endDay,
      weekday: endWeekday,
    },
  };
};

/**
 * Format a phone number to be more readable
 */
const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) return '';

  if (phoneNumber.length === 12) {
    const areaCode = phoneNumber.substring(2, 5);
    const localNumber = `${phoneNumber.substring(5, 8)}-${phoneNumber.substring(8, 12)}`;

    phoneNumber = `(${areaCode}) ${localNumber}`;
  }

  return phoneNumber;
};

export default {
  event: (event: Event) => formatEvent(event),
  phoneNumber: (phoneNumber: string) => formatPhoneNumber(phoneNumber),
};

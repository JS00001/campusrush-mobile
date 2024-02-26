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

interface FormattedEvent extends Event {
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
  totalResponses: number;
}

export const formatEvent = (event: Event): FormattedEvent => {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  const totalResponses = event.yesCount + event.noCount;

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
    totalResponses,
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

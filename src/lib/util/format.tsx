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
  day: string;
  startTime: string;
  endTime: string;
  timeString: string;
  totalResponses: number;
}

export const formatEvent = (event: Event): FormattedEvent => {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  const day = startDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const startTime = startDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  });

  const endTime = endDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
  });

  const timeString = `${startTime} - ${endTime}`;

  const totalResponses = event.yesCount + event.noCount;

  return {
    ...event,
    day,
    startTime,
    endTime,
    timeString,
    totalResponses,
  };
};

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

import date from '@/lib/util/date';

export type TimestampedData<T = {}> = {
  date?: string;
  showDate?: boolean;
  showTimestamp?: boolean;
} & T;

/**
 * Group data by date
 */
const byDate = <T>(
  data: T[],
  dateKey: keyof T,
  isInverted = false,
): TimestampedData<T>[] => {
  if (!data.length) return [];

  const timestampedData: TimestampedData<T>[] = [];
  let previousDate = date.getRelativeDate(new Date(data[0][dateKey] as string));

  timestampedData.push({
    ...data[0],
    date: previousDate,
    showTimestamp: true,
    showDate: !isInverted || data.length === 1,
  });

  data.slice(1).forEach((item, index) => {
    const dateString = date.getRelativeDate(new Date(item[dateKey] as string));

    const timestampedItem: TimestampedData<T> = {
      ...item,
      date: dateString,
      showTimestamp: false,
      showDate: false,
    };

    if (isInverted) {
      timestampedData[index].showDate = dateString !== previousDate;
      timestampedItem.showDate = index === data.length - 2;
    } else if (dateString !== previousDate) {
      timestampedItem.showDate = true;
    }

    timestampedData.push(timestampedItem);
    previousDate = dateString;
  });

  return timestampedData;
};

export default { byDate };

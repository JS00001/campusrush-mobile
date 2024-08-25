/*
 * Created on Sat Feb 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useEffect, useState } from 'react';

interface IUseSearch<T> {
  /** The data to be filtered */
  data: T[];

  /** The filters to be applied */
  filters?: {
    /** The filter id */
    id: string;
    /** The filter function */
    filterFn: (data: T[]) => T[];
  }[];

  /** Sorting methods to be applied */
  sortingMethods?: {
    /** The sort id */
    id: string;
    /** The key to sort by */
    key: keyof T;
    /** the direction to sort by */
    direction: 'asc' | 'desc';
  }[];

  /** The fields to search in (searches entire object values if not passed) */
  fields?: (keyof T)[];
  /** The default filter (defaults to 'NO_FILTER') (typeof filter.id) */
  defaultFilter?: string;
  /** The default sorting method (defaults to 'NO_SORT') */
  defaultSortingMethod?: string;
}

const useSearch = <T extends Object | String>({
  data,
  filters = [],
  sortingMethods = [],
  fields = [],
  defaultFilter = 'NO_FILTER',
  defaultSortingMethod = 'NO_SORT',
}: IUseSearch<T>) => {
  type FilterID = (typeof filters)[number]['id'] | 'NO_FILTER';
  type SortID = (typeof sortingMethods)[number]['id'] | 'NO_SORT';

  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [filter, setFilter] = useState<FilterID>(defaultFilter);
  const [sortingMethod, setSortingMethod] =
    useState<SortID>(defaultSortingMethod);

  /**
   * When the query, data, or filter changes, filter the data
   * and return the updated data
   */
  useEffect(() => {
    const matchedData = data.filter((item) => {
      if (fields.length) {
        return fields.some((field) => {
          const value = item[field];

          if (!value) return false;

          return JSON.stringify(value)
            .toLowerCase()
            .includes(query.toLowerCase());
        });
      }

      // Check if data is an array of strings rather than objects
      if (typeof item === 'string') {
        return item.toLowerCase().includes(query.toLowerCase());
      }

      const values = Object.values(item).join(' ').toLowerCase();

      return values.includes(query.toLowerCase());
    });

    // If there is a sorting method, sort the data
    if (sortingMethod !== 'NO_SORT') {
      matchedData.sort((a, b) => {
        const sortMethod = sortingMethods.find((s) => s.id === sortingMethod);

        if (!sortMethod) return 0;

        const aValue = a[sortMethod.key];
        const bValue = b[sortMethod.key];

        if (sortMethod.direction === 'asc') {
          if (aValue > bValue) return 1;
          if (aValue < bValue) return -1;
          return 0;
        }

        if (aValue > bValue) return -1;
        if (aValue < bValue) return 1;
        return 0;
      });
    }

    // If there is a filter, apply the filter
    if (filter !== 'NO_FILTER') {
      const filterFn = filters.find((f) => f.id === filter)?.filterFn;

      if (filterFn) {
        const filtered = filterFn(matchedData);
        setFilteredData(filtered);
      }

      return;
    }

    setFilteredData(matchedData);
  }, [query, filter, sortingMethod, data]);

  return {
    filter,
    sortingMethod,
    query,
    focused,
    data: filteredData,
    setFilter,
    setSortingMethod,
    setQuery,
    setFocused,
  };
};

export default useSearch;

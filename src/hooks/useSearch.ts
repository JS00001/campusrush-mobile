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

import { useMemo, useState } from 'react';

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
  const [filter, setFilter] = useState<FilterID>(defaultFilter);
  const [sortingMethod, setSortingMethod] =
    useState<SortID>(defaultSortingMethod);

  /**
   * When the query, data, or filter changes, filter the data
   * and return the updated data
   */
  const filteredData = useMemo(() => {
    // First, filter by search query
    let matchedData = data.filter((item) => {
      if (fields.length) {
        return fields.some((field) => {
          const value = item[field];
          if (!value) return false;
          return JSON.stringify(value)
            .toLowerCase()
            .includes(query.toLowerCase());
        });
      }

      if (typeof item === 'string') {
        return item.toLowerCase().includes(query.toLowerCase());
      }

      const values = Object.values(item).join(' ').toLowerCase();
      return values.includes(query.toLowerCase());
    });

    // Apply sorting if needed
    if (sortingMethod !== 'NO_SORT') {
      const sortMethod = sortingMethods.find((s) => s.id === sortingMethod);
      if (sortMethod) {
        matchedData = [...matchedData].sort((a, b) => {
          const aValue = a[sortMethod.key];
          const bValue = b[sortMethod.key];

          if (sortMethod.direction === 'asc') {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
          }
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        });
      }
    }

    // Apply filters if needed
    if (filter !== 'NO_FILTER') {
      const filterFn = filters.find((f) => f.id === filter)?.filterFn;
      if (filterFn) {
        matchedData = filterFn(matchedData);
      }
    }

    return matchedData;
  }, [data, query, filter, sortingMethod, fields, filters, sortingMethods]);

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

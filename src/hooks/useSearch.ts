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

interface IUseSearch<T = any> {
  /** The data to be filtered */
  data: T[];
  /** The filters to be applied */
  filters?: {
    /** The filter id */
    id: string;
    /** The filter function */
    filterFn: (data: T[]) => T[];
  }[];
  /** The fields to search in (searches entire object values if not passed) */
  fields?: (keyof T)[];
}

const useSearch = ({ data, filters = [], fields = [] }: IUseSearch) => {
  type FilterID = (typeof filters)[number]['id'] | 'NO_FILTER';

  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [filter, setFilter] = useState<FilterID>('NO_FILTER');

  /**
   * When the query, data, or filter changes, filter the data
   * and return the updated data
   */
  useEffect(() => {
    const matchedData = data.filter((item) => {
      if (fields.length) {
        return fields.some((field) => {
          const value = item[field];

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

    if (filter !== 'NO_FILTER') {
      const filterFn = filters.find((f) => f.id === filter)?.filterFn;

      if (filterFn) {
        const filtered = filterFn(matchedData);
        setFilteredData(filtered);
      }

      return;
    }

    setFilteredData(matchedData);
  }, [query, filter, data]);

  return {
    filter,
    query,
    data: filteredData,
    setFilter,
    setQuery,
  };
};

export default useSearch;

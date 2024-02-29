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
}

const useSearch = ({ data, filters = [] }: IUseSearch) => {
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

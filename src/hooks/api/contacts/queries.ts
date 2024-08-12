/*
 * Created on Sun Aug 11 2024
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
import { useQuery } from '@tanstack/react-query';

import { getContacts } from '@/api';
import { useAuth } from '@/providers/Auth';
import { useContactStore } from '@/store';

export const useGetContacts = () => {
  const { accessToken } = useAuth();
  const contactStore = useContactStore();
  const [isLoading, setIsLoading] = useState(true);

  const query = useQuery(['contacts', accessToken], {
    queryFn: () => {
      return getContacts();
    },
  });

  useEffect(() => {
    if (!query.data || 'error' in query.data) {
      setIsLoading(query.isLoading);
      return;
    }

    contactStore.setContacts('all', query.data.data.all);
    contactStore.setContacts('suggested', query.data.data.suggested);
    contactStore.setContacts('starred', query.data.data.favorited);
    contactStore.setContacts('uncontacted', query.data.data.uncontacted);

    setIsLoading(query.isLoading);
  }, [query.data]);

  return {
    ...query,
    all: contactStore.all,
    suggested: contactStore.suggested,
    starred: contactStore.starred,
    uncontacted: contactStore.uncontacted,
    isLoading: isLoading && !contactStore.all.length,
  };
};

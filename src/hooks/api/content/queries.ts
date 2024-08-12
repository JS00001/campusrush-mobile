/*
 * Created on Fri Feb 23 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useQuery } from '@tanstack/react-query';
import { getPrivacyPolicy, getTermsOfService } from '@/api';

export const useGetTermsOfService = () => {
  return useQuery(['termsOfService'], {
    queryFn: () => {
      return getTermsOfService();
    },
  });
};

export const useGetPrivacyPolicy = () => {
  return useQuery(['privacyPolicy'], {
    queryFn: () => {
      return getPrivacyPolicy();
    },
  });
};

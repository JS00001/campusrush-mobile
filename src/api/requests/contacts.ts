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

import type { GetContactsResponse } from '@/types';

import axios from '@/lib/axios';

const PREFIX = '/contacts';

/**
 * Request:     GET /api/v1/consumer/contacts
 * Description: Get all contacts
 */
export const getContacts = async () => {
  const url = `${PREFIX}`;

  const { data } = await axios.get<GetContactsResponse>(url);

  return data;
};

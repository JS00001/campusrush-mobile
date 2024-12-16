/*
 * Created on Sat Sep 07 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */
/*
 * Created on Sat Sep 07 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import axios from '@/lib/axios';

import type {
  PurchasePhoneNumberResponse,
  PurchasePhoneNumberRequest,
} from '@/types';

const PREFIX = '/billing';

/**
 * Request:     POST /api/v1/consumer/billing/phone-number
 * Description: Purchase a phone number
 */
export const purchasePhoneNumber = async (data: PurchasePhoneNumberRequest) => {
  const url = `${PREFIX}/phone-number`;

  const { data: responseData } = await axios.post<PurchasePhoneNumberResponse>(
    url,
    data,
  );

  return responseData;
};

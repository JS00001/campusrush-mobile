/*
 * Created on Tue Nov 14 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

interface PrivacyPolicy {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
}

interface TermsOfService {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
}

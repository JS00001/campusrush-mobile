/*
 * Created on Fri Aug 11 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

interface Organization {
  _id: string;
  // Identifying information
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  school: string;
  verified: boolean;
  // Users of the organization
  pnms: PNM[];
  // Billing
  customerId: string;
  entitlements: string[];
  // Notifications
  notificationsEnabled: boolean;
}

interface PNM {
  _id: string;
  // Organization information
  organization: string;
  // Identifying information
  firstName: string;
  lastName: string;
  phoneNumber: string;
  // Social media
  instagram: string;
  snapchat: string;
  // Other information
  receivedBid: boolean;
  classification: string;
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

interface APIError {
  field?: string;
  message: string;
  humanMessage: string;
}

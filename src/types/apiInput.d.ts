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

interface LoginAsOrganizationInput {
  email: string;
  password: string;
}

interface RegisterAsOrganizationInput {
  name: string;
  school: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface CheckOrganizationExistsInput {
  school: string;
  organization: string;
}

interface CheckEmailExistsInput {
  email: string;
}

interface VerifyOrganizationInput {
  accessToken: string;
  code: string;
}

interface ResendVerificationInput {
  accessToken: string;
}

interface GetOrganizationInput {
  accessToken: string;
}

interface RefreshAccessTokenInput {
  refreshToken?: string;
}

interface LogoutInput {
  accessToken: string;
}

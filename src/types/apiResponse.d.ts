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
interface APIResponse {
  data: {
    data: {
      error?: APIError;
      message?: string;
    };
  };
}

interface APIError {
  error: {
    field?: string;
    traceback: string;
    message: string;
    humanMessage: string;
  };
}

type GetOrganizationsAPIResponse = APIResponse & {
  data: {
    data: {
      organizations: String[];
      schools: String[];
    };
  };
};

type LoginAsOrganizationAPIResponse = APIResponse & {
  data: {
    data: {
      organization: Organization;
      accessToken: string;
      refreshToken: string;
    };
  };
};

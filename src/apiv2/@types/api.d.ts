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

import { AxiosResponse } from 'axios';

namespace API {
  /**
   * The type of error that can be returned from the API
   */
  type ErrorType =
    | 'BAD_REQUEST'
    | 'INTERNAL_SERVER_ERROR'
    | 'NO_ENTITLEMENTS'
    | 'MISSING_ENTITLEMENT'
    | 'UPGRADABLE_ENTITLEMENT_LIMIT_REACHED'
    | 'MAXIMUM_ENTITLEMENT_LIMIT_REACHED'
    | 'INVALID_FIELDS'
    | 'UNAUTHORIZED'
    | 'EXPIRED_TOKEN'
    | 'USER_NOT_FOUND'
    | 'RATE_LIMIT_EXCEEDED';

  /**
   * The error returned from the API
   */
  type Error = {
    /**
     * The field that the error occurred on
     */
    field?: string;
    /**
     * The tracback to the api module that threw the error
     */
    traceback: string;
    /**
     * The type of error that occurred
     */
    message: ErrorType;
    /**
     * A human readable message for the error
     */
    humanMessage: string;
  };

  /**
   * The success response returned from the API
   */
  type SuccessResponse<T> = {
    /**
     * The data returned from the API
     */
    data: T;
  };

  /**
   * The error response returned from the API
   */
  type ErrorResponse = {
    /**
     * The error returned from the API
     */
    error: Error;
  };

  /**
   * The response returned from the API
   */
  type Response<T> = AxiosResponse<SuccessResponse<T> | ErrorResponse>;
}

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

import { z } from 'zod';
import { useState } from 'react';
import { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import type { UseMutationResult } from '@tanstack/react-query';

interface IUseFormMutation<TResponse, TRequest> {
  /** The mutation hook from react-query */
  mutation: UseMutationResult<
    API.Response<TResponse>,
    unknown,
    TRequest,
    unknown
  >;

  /** The zod-ready validation schema for the request (will be passed to zod.object) */
  validators: Record<string, any>;

  /** The callback to be executed on success */
  onSuccess: (data: API.Response<TResponse>) => Promise<void>;
}

const useFormMutation = <TResponse = any, TRequest = any>({
  mutation,
  validators,
  onSuccess,
}: IUseFormMutation<TResponse, TRequest>) => {
  /**
   * Create types for the fields and state so that it
   * auto-completes the fields and their values when typing (based on the validators object)
   */
  type TFields = keyof typeof validators;

  type TState = {
    [K in TFields]: {
      value: string | undefined;
      error: string;
    };
  };

  const initialState = Object.fromEntries(
    Object.keys(validators).map((key) => [
      key,
      { value: undefined, error: '' },
    ]),
  ) as TState;

  const [loading, setLoading] = useState(false);
  const [internalState, setInternalState] = useState(initialState);

  /**
   * Take the internal state and transform it into a state that can be used
   * for data submission and validators: {key: key, key2: key2, etc: etc}
   */
  const transformedState = Object.fromEntries(
    Object.entries(internalState).map(([key, value]) => [key, value.value]),
  );

  /**
   * Set the value of a field in the state, this is essentially a more
   * controlled version of the normal setState function in React
   */
  const setValue = (key: TFields, value: string) => {
    setInternalState((prev) => ({
      ...prev,
      [key]: {
        value,
        error: '',
      },
    }));
  };

  /**
   * Set the error of a field in the state, this is essentially a more
   * controlled version of the normal setState function in React
   */
  const setError = (key: TFields, error: string) => {
    setInternalState((prev) => ({
      ...prev,
      [key]: {
        value: prev[key].value,
        error,
      },
    }));
  };

  /**
   * Sets the error fields in the state. Can be used to check
   * the state before submission. **Note**: This function will automatically
   * run when the form is submitted
   */
  const validateState = () => {
    const validatorsSchema = z.object(validators);
    const validatorsResult = validatorsSchema.safeParse(transformedState);

    if (validatorsResult.success === false) {
      const errors = validatorsResult.error.errors;

      for (const error of errors) {
        const field = error.path.join('.');

        setError(field as TFields, error.message);
      }

      return false;
    }

    return true;
  };

  /**
   * The main function that will be used to submit the form. This function
   * will handle the validators and the API call, along with
   * error handling and loading state
   */
  const handleSubmission = async () => {
    setLoading(true);

    /**
     * Step 1: Validate the form client side
     */
    const isStateValid = validateState();

    if (isStateValid === false) {
      setLoading(false);
      return;
    }

    /**
     * Step 2: Call the API
     */
    try {
      const res = await mutation.mutateAsync(transformedState as TRequest);

      await onSuccess(res);

      setLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = (err.response?.data as API.ErrorResponse).error;
        const errorField = error.field as TFields; // We can assume the field will be defined, because we catch all errors with no field in the Axios Provider
        const isFieldInState = Object.keys(internalState).includes(errorField);

        if (!isFieldInState) {
          Toast.show({
            type: 'error',
            text1: 'An error occurred',
            text2: error.humanMessage,
          });

          setLoading(false);
          return;
        }

        setError(errorField, error.humanMessage);
        setLoading(false);
        return;
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An unexpected error occurred. Please try again later.',
        });

        setLoading(false);
      }
    }
  };

  return {
    loading,
    state: internalState,
    setValue,
    setError,
    validateState,
    handleSubmission,
  };
};

export default useFormMutation;

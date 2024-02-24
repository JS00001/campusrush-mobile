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

interface IUseForm {
  /** The zod-ready validation schema for the request (will be passed to zod.object) */
  validators: Record<string, any>;

  /** The initial values for a form (optional) */
  initialValues?: Record<string, string | undefined>;
}

const useForm = ({ validators, initialValues }: IUseForm) => {
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
      {
        value: initialValues ? initialValues[key] : undefined,
        error: '',
      },
    ]),
  ) as TState;

  const [state, setState] = useState(initialState);

  /**
   * Take the internal state and transform it into a state that can be used
   * for data submission and validators: {key: key, key2: key2, etc: etc}
   */
  const transformedState = Object.fromEntries(
    Object.entries(state).map(([key, value]) => [key, value.value]),
  );

  /**
   * Set the value of a field in the state, this is essentially a more
   * controlled version of the normal setState function in React
   */
  const setValue = (key: TFields, value: string) => {
    setState((prev) => ({
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
    setState((prev) => ({
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

  return {
    state,
    setValue,
    setError,
    validateState,
  };
};

export default useForm;

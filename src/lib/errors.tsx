/*
 * Created on Mon Oct 23 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { AxiosError } from "axios";
import Toast from "react-native-toast-message";

import Content from "@/constants/content";

const handleApiError = (error: any, form?: any) => {
  if (error instanceof AxiosError) {
    // Extract the error message
    const errorMessage = error.response?.data?.error as APIError;

    // If there is a field that the error applies to
    // and the form has that field
    if (errorMessage.field && form.values.hasOwnProperty(errorMessage.field)) {
      // Set the field error
      form.setFieldError(errorMessage.field, errorMessage.humanMessage);
    } else {
      // Else show the error as a toast message
      Toast.show({
        type: "error",
        text1: Content.errorTitle,
        text2: errorMessage.humanMessage,
      });
    }
  }
};

export default {
  handleApiError,
};

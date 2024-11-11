/*
 * Created on Sun Nov 10 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { AxiosError } from "axios";

import Icon from "@/ui/Icon";
import Text from "@/ui/Text";
import tw from "@/lib/tailwind";
import SafeAreaView from "@/ui/SafeAreaView";

interface ErrorMessageProps {
  error: Error | null;
  style?: any;
  description?: string;
  fallbackMessage?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  error,
  style,
  description,
  fallbackMessage,
}) => {
  const httpError = (() => {
    if (error instanceof AxiosError) {
      const humanMessage = error.response?.data.error?.humanMessage;

      if (humanMessage) return humanMessage;
    }

    if (fallbackMessage) {
      return fallbackMessage;
    }

    return error?.message;
  })();

  const errorMessage = description ? `${description}: ${httpError}` : httpError;

  const containerStyles = tw.style("gap-2 items-center justify-center", style);

  return (
    <SafeAreaView position="top" style={containerStyles}>
      <Icon size={24} name="alert-fill" color={tw.color("yellow")} />
      <Text style={tw`text-center`}>{errorMessage}</Text>
    </SafeAreaView>
  );
};

export default ErrorMessage;

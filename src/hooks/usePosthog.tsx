/*
 * Created on Fri Jan 05 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { usePostHog as useRNPosthog } from "posthog-react-native";

type Event =
  | "complete_registration_step_1"
  | "complete_registration_step_2"
  | "complete_registration"
  | "login";

const usePosthog = () => {
  const posthog = useRNPosthog();

  const capture = (event: Event, properties?: any) => {
    posthog?.capture(event, properties);
  };

  return {
    capture,
  };
};

export default usePosthog;

/*
 * Created on Fri Jul 26 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { handle } from '@/lib/util/error';

import { usePostHog as usePosthogNative } from 'posthog-react-native';

const usePosthog = () => {
  const posthog = usePosthogNative();

  // Capture an event with optional properties
  const capture = (event: string, properties?: Record<string, any>) => {
    if (!posthog) {
      return;
    }

    handle(() => {
      posthog.capture(event, properties);
    });
  };

  // Identify the user with a distinct ID and properties
  const identify = (distinctId: string, properties?: Record<string, any>) => {
    if (!posthog) {
      return;
    }

    handle(() => {
      posthog.identify(distinctId, properties);
    });
  };

  // Reset the user's session
  const reset = () => {
    if (!posthog) {
      return;
    }

    handle(() => {
      posthog.reset();
    });
  };

  return { capture, identify, reset };
};

export default usePosthog;

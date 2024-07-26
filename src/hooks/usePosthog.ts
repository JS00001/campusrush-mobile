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
import { useAuth } from '@/providers/Auth';
import { usePostHog as usePosthogNative } from 'posthog-react-native';

const usePosthog = () => {
  const { chapter } = useAuth();
  const posthog = usePosthogNative();

  const capture = (event: string, properties?: Record<string, any>) => {
    if (!posthog) {
      return;
    }

    // Posthog automatically removes undefined values
    const eventData = {
      chapter_name: chapter?.name,
      chapter_email: chapter?.email,
      ...properties,
    };

    handle(() => {
      posthog.capture(event, eventData);
    });
  };

  return { capture };
};

export default usePosthog;

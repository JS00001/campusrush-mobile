/*
 * Created on Thu Nov 30 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { PostHogProvider } from "posthog-react-native";

import AppConstants from "@/constants";

const PosthogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Do not track events in development or staging
  if (AppConstants.environment !== "production") return children;

  return (
    <PostHogProvider
      apiKey={AppConstants.posthogApiKey}
      autocapture={{
        captureLifecycleEvents: false,
        captureTouches: true,
        customLabelProp: "ph-label",
      }}
      options={{
        host: AppConstants.posthogUrl,
      }}
    >
      {children}
    </PostHogProvider>
  );
};

export default PosthogProvider;

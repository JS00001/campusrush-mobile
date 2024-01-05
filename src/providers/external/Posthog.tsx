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

interface PosthogProviderProps {
  children: React.ReactNode;
}

const PosthogProvider: React.FC<PosthogProviderProps> = ({ children }) => {
  if (!AppConstants.isProduction) return <>{children}</>;

  return (
    <PostHogProvider
      apiKey={AppConstants.posthogApiKey}
      options={{
        host: AppConstants.posthogUrl,
      }}
    >
      {children}
    </PostHogProvider>
  );
};

export default PosthogProvider;

/*
 * Created on Sun Apr 14 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useQuery } from '@tanstack/react-query';
import { getWebsiteMetadata } from '@/api/requests/third-party/metadata';

const useWebsiteMetadata = (url: string) => {
  /**
   * Fetch the metadata for the URL
   */
  const query = useQuery({
    queryKey: ['website_metadata', url],
    queryFn: async () => {
      return getWebsiteMetadata(url);
    },
  });

  // Returns JUST the domain of the URL
  // IE: https://campusrush.app -> campusrush.app
  // OR: https://google.com/search?q=hello -> google.com
  const rawUrl = (() => {
    const urlParts = url.split('/');
    const domain = urlParts[2];

    return domain;
  })();

  const { image, title, description } = query.data || {};

  return {
    image,
    title,
    description,
    rawUrl,
    ...query,
  };
};

export default useWebsiteMetadata;

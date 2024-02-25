/*
 * Created on Fri Aug 11 2023
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
import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (err) => {
      if (err instanceof AxiosError) {
        const statusCode = err.response?.status;
        if (statusCode === 429) {
          return;
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (err) => {
      if (err instanceof AxiosError) {
        const statusCode = err.response?.status;
        if (statusCode === 429) {
          return;
        }
      }
    },
  }),
});

export default queryClient;

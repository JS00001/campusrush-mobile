/*
 * Created on Wed Apr 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { create } from 'zustand';
import { PersistStorage, persist } from 'zustand/middleware';

import type { GetMetadataResponse, Metadata } from '@/types';

import customAsyncStorage from '@/lib/asyncStorage';

interface IMetadataStore {
  metadata: Partial<Metadata>;

  setMetadata: (metadata: GetMetadataResponse) => void;
}

export const useMetadataStore = create<IMetadataStore>()(
  persist(
    (set) => {
      /**
       * The initial values for the metadata store
       */
      const initialValues = {
        metadata: {
          tags: [],
          version: '0.0.0',
          latestVersion: '0.0.0',
          entitlements: undefined,
        },
      };

      /**
       * Set the metadata
       */
      const setMetadata = (metadata: GetMetadataResponse) => {
        if ('error' in metadata) return;

        set({ metadata: metadata.data });
      };

      return {
        ...initialValues,
        setMetadata,
      };
    },
    {
      name: 'metadata-store',
      storage: customAsyncStorage as PersistStorage<IMetadataStore>,
    },
  ),
);

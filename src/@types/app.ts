/*
 * Created on Sun Aug 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type { EntitlementDetails } from './entitlements';

/** A category of tags, used to separate tags out */
export interface TagCategory {
  /** The category id */
  id: string;
  /** The category name */
  name: string;
  /** The tags in this category */
  tags: string[];
}

/** All metadata associated with the app */
export interface Metadata {
  /** The minimum version of the app that can be used with the API */
  version: string;
  /** The latest version of the app */
  latestVersion: string;
  /** All tags that can be used */
  tags: TagCategory[];
  /** All area codes that can be used ({areaCode: state}) */
  areaCodes: Record<string, string>;
  /** All entitlements and their descriptions */
  entitlements: EntitlementDetails;
}

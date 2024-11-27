/*
 * Created on Sun Sep 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type { MoreTabParams } from '@/navigation/@types';
import type { IconType } from '@/constants/icons';

export type ISidebar = ISidebarSection[];

type ISidebarSection = {
  label: string;
  items: ISidebarItem[];
  hidden?: boolean;
};

type ISidebarItem = {
  icon: IconType;
  label: string;
  newFeature: boolean;
  badgeCount?: number;
  hidden?: boolean;
  screen?: keyof MoreTabParams;
  loading?: boolean;
  onPress?: () => void;
};

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
import type { IconType } from '@/ui/Icon';

export type ISidebar = ISidebarSection[];

type ISidebarSection = {
  label: string;
  items: ISidebarItem[];
};

type ISidebarItem = {
  icon: IconType;
  label: string;
  hidden: boolean;
  newFeature: boolean;
  badgeCount?: number;
  screen?: keyof MoreTabParams;
  loading?: boolean;
  onPress?: () => void;
};

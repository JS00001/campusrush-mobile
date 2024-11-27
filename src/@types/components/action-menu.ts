/*
 * Created on Tue Sep 03 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type { IconType } from '@/constants/icons';

export type ActionMenu = ActionMenuSection[];

export interface ActionMenuSection {
  /** The header to display at the top of the menu section */
  header?: string;
  /** The items to display in the menu */
  menuItems: ActionMenuItem[];
}
[];

export interface ActionMenuItem {
  /** The icon to display */
  iconName: IconType;
  /** The label to display */
  label: string;
  /** The function to call when the item is pressed */
  onPress: () => void;
}

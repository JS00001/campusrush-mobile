/*
 * Created on Thu Dec 05 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

export interface ISelectOption<T = any> {
  /** The label of the item */
  label: string;
  /** The value of the item */
  value: T;
}

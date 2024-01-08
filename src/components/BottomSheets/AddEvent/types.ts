/*
 * Created on Wed Dec 27 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

export enum AddEventScreens {
  AddEventStep1 = 'AddEventStep1',
  AddEventStep2 = 'AddEventStep2',
  AddEventStep3 = 'AddEventStep3',
}

export type ScreensList = Record<AddEventScreens, { component: JSX.Element }>;

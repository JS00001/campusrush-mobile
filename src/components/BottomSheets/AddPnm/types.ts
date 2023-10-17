/*
 * Created on Tue Oct 17 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

export enum AddPnmScreens {
  AddPnm = 'ADD_PNM',
  AddManualStep1 = 'ADD_MANUAL_STEP_1',
  AddManualStep2 = 'ADD_MANUAL_STEP_2',
  AddManualStep3 = 'ADD_MANUAL_STEP_3',
  AddQrCode = 'ADD_QR_CODE',
}

export type ScreensList = Record<
  AddPnmScreens,
  { position: string; component: JSX.Element }
>;

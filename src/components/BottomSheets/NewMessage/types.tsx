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

export enum NewMessageScreens {
  NewMessage = 'NEW_MESSAGE',
  DirectMessage = 'DIRECT_MESSAGE',
}

export type ScreensList = Record<
  NewMessageScreens,
  { position: string; component: JSX.Element }
>;

/*
 * Created on Sat Nov 25 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

type MessageType = 'NEW_MESSAGE';

interface SocketMessage {
  type: MessageType;
  data: any;
  notification?: {
    title: string;
    body: string;
  };
}

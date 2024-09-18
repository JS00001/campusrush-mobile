/*
 * Created on Wed Nov 29 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

export type MessageType = 'READ_CONVERSATION' | 'READ_NOTIFICATIONS';

export interface SocketInputData {
  type: MessageType;
  data?: any;
}

class SocketInput {
  private data: any;
  private type: MessageType;

  constructor({ type, data }: SocketInputData) {
    this.type = type;
    this.data = data;
  }

  public getType() {
    return this.type;
  }

  public getData() {
    return this.data;
  }

  public toString() {
    return JSON.stringify({
      type: this.type,
      data: this.data,
    });
  }
}

export default SocketInput;

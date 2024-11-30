/*
 * Created on Sat Nov 30 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

export interface IForm {
  _id: string;
  chapter: string;
  title: string;
  responseCount: number;
  enabled: boolean;
  lastResponseAt: Date;
  fields: IFormField[];
  createdAt: Date;
  updatedAt: Date;
}

export enum FieldType {
  TEXT = "text",
  LONGTEXT = "longtext",
  CHECKBOX = "checkbox",
}

export interface IFormField {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
}

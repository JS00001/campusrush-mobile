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

export enum FieldType {
  Text = 'text',
  LongText = 'longtext',
  Checkbox = 'checkbox',
}

export interface IForm {
  /** The ID of the form */
  _id: string;
  /** The chapter that the form belongs to */
  chapter: string;
  /** The title of the form */
  title: string;
  /** The description of the form */
  responseCount: number;
  /** Whether the form is enabled */
  enabled: boolean;
  /** The date the form was last responded to */
  lastResponseAt: Date;
  /** The fields of the form */
  fields: IFormField[];
  /** When the form was created */
  createdAt: Date;
  /** When the form was last updated */
  updatedAt: Date;
}

export interface IFormField {
  /** The ID of the field */
  id: string;
  /** The name of the field */
  name: string;
  /** The type of the field */
  type: FieldType;
  /** Whether the field is required or not  */
  required: boolean;
}

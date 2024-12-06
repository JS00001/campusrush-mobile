/*
 * Created on Fri Nov 22 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import {
  CreateFormRequest,
  CreateFormResponse,
  DeleteFormsResponse,
  GetFormRequest,
  GetFormResponse,
  GetFormResponsesRequest,
  GetFormResponsesResponse,
  UpdateFormRequest,
  UpdateFormResponse,
  type DeleteFormsRequest,
  type GetFormsResponse,
} from '@/types';

import axios from '@/lib/axios';

const PREFIX = '/forms';

/**
 * Request:     GET /api/v1/consumer/forms
 * Description: Get all forms for the chapter
 */
export const getForms = async () => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axios.get<GetFormsResponse>(url);

  return responseData;
};

/**
 * Request:     DELETE /api/v1/consumer/forms
 * Description: Delete ALL forms, or the passed in form ids
 */
export const deleteForms = async (data?: DeleteFormsRequest) => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axios.delete<DeleteFormsResponse>(url, {
    data,
  });

  return responseData;
};

/**
 * Request:     POST /api/v1/consumer/forms
 * Description: Create a new form
 */
export const createForm = async (data: CreateFormRequest) => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axios.post<CreateFormResponse>(
    url,
    data,
  );

  return responseData;
};

/**
 * Request:     GET /api/v1/consumer/forms/:id
 * Description: Get a form by id
 */
export const getForm = async (data: GetFormRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const { data: responseData } = await axios.get<GetFormResponse>(url);

  return responseData;
};

/**
 * Request:     GET /api/v1/consumer/forms/:id/responses
 * Description: Get all responses for a form by id
 */
export const getFormResponses = async (data: GetFormResponsesRequest) => {
  const url = `${PREFIX}/${data.id}/responses`;
  // Remove empty string search
  const search = data.search || undefined;

  const { data: responseData } = await axios.get<GetFormResponsesResponse>(
    url,
    { params: { search } },
  );

  return responseData;
};
/**
 * Request:     PUT /api/v1/consumer/forms/:id
 * Description: Update a form by id
 */
export const updateForm = async (data: UpdateFormRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const { data: responseData } = await axios.put<UpdateFormResponse>(url, data);

  return responseData;
};

/**
 * Request:     DELETE /api/v1/consumer/forms/:id
 * Description: Delete a form by id
 */
export const deleteForm = async (data: GetFormRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const { data: responseData } = await axios.delete(url);

  return responseData;
};

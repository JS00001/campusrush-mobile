/*
 * Created on Fri Feb 23 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import type {
  GetEventsResponse,
  DeleteEventResponse,
  GetEventRequest,
  GetEventResponse,
  CreateEventRequest,
  CreateEventResponse,
  UpdateEventRequest,
  UpdateEventResponse,
  DeleteEventRequest,
} from '@/types';

import { axiosClient } from '@/providers/Axios';

const PREFIX = '/api/v1/consumer/events';

/**
 * Request:     GET /api/v1/consumer/events
 * Description: Get all events
 */
export const getEvents = async () => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axiosClient.get(url);

  return responseData as GetEventsResponse;
};

/**
 * Request:     DELETE /api/v1/consumer/events
 * Description: Delete ALL events
 */
export const deleteEvents = async () => {
  const url = `${PREFIX}`;

  const { data } = await axiosClient.delete(url);

  return data as DeleteEventResponse;
};

/**
 * Request:     GET /api/v1/consumer/events/:id
 * Description: Get an event by id
 */
export const getEvent = async (data: GetEventRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const { data: responseData } = await axiosClient.get(url);

  return responseData as GetEventResponse;
};

/**
 * Request:     POST /api/v1/consumer/events
 * Description: Create an event
 */
export const createEvent = async (data: CreateEventRequest) => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as CreateEventResponse;
};

/**
 * Request:     PUT /api/v1/consumer/events/:id
 * Description: Update an event
 */
export const updateEvent = async (data: UpdateEventRequest) => {
  const { id, ...rest } = data;
  const url = `${PREFIX}/${id}`;

  const { data: responseData } = await axiosClient.put(url, rest);

  return responseData as UpdateEventResponse;
};

/**
 * Request:     DELETE /api/v1/consumer/events/:id
 * Description: Delete an event
 */
export const deleteEvent = async (data: DeleteEventRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const { data: responseData } = await axiosClient.delete(url);

  return responseData as DeleteEventResponse;
};

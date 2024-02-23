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

import { axiosClient } from '@/providers/Axios';

const PREFIX = '/api/v1/consumer/events';

/**
 * Request:     GET /api/v1/consumer/events/list
 * Description: Get all events
 */
export const getEvents = async (data: GetEventsRequest) => {
  const url = `${PREFIX}/list`;

  const { data: responseData } = await axiosClient.get(url, { params: data });

  return responseData as GetEventsResponse;
};

/**
 * Request:     DELETE /api/v1/consumer/events/delete
 * Description: Delete ALL events
 */
export const deleteEvents = async () => {
  const url = `${PREFIX}/delete`;

  const { data } = await axiosClient.delete(url);

  return data as DeleteEventResponse;
};

/**
 * Request:     POST /api/v1/consumer/events/create
 * Description: Create an event
 */
export const createEvent = async (data: CreateEventRequest) => {
  const url = `${PREFIX}/create`;

  const { data: responseData } = await axiosClient.post(url, data);

  return responseData as CreateEventResponse;
};

/**
 * Request:     PUT /api/v1/consumer/events/update/:id
 * Description: Update an event
 */
export const updateEvent = async (data: UpdateEventRequest) => {
  const { id, ...rest } = data;
  const url = `${PREFIX}/update/${id}`;

  const { data: responseData } = await axiosClient.put(url, rest);

  return responseData as UpdateEventResponse;
};

/**
 * Request:     DELETE /api/v1/consumer/events/delete/:id
 * Description: Delete an event
 */
export const deleteEvent = async (data: DeleteEventRequest) => {
  const url = `${PREFIX}/delete/${data.id}`;

  const { data: responseData } = await axiosClient.delete(url);

  return responseData as DeleteEventResponse;
};

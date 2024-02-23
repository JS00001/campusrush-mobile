/*
 * Created on Wed Dec 20 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { axiosClient } from '@/providers/Axios';

// Create a new axios client for this file
const eventsAPIClient = axiosClient;
// The prefix for all routes in this file
const PREFIX = '/api/v1/consumer/events';

/**
 * GET /api/v1/events/list
 *
 * Returns
 * - data
 *  - events
 */
// prettier-ignore
const getEvents = (data: GetEventsInput): Promise<GetEventsAPIResponse> => {
  const { offset } = data;

  return eventsAPIClient.get(`${PREFIX}/list`, {
    params: {
      offset,
    },
  });
};

/**
 * DELETE /api/v1/events/delete
 *
 * Returns
 * - data
 *  - events
 */
// prettier-ignore
const deleteEvents = (): Promise<DeleteEventsAPIResponse> => {
  return eventsAPIClient.delete(`${PREFIX}/delete`);
};

/**
 * POST /api/v1/events/create
 *
 * Returns
 * - data
 *  - event
 */
// prettier-ignore
const createEvent = (data: CreateEventInput): Promise<CreateEventAPIResponse> => {
  return eventsAPIClient.post(`${PREFIX}/create`, data);
};

/**
 * PUT /api/v1/events/update/:id
 *
 * Returns
 * - data
 *  - event
 */
// prettier-ignore
const updateEvent = (data: UpdateEventInput): Promise<UpdateEventAPIResponse> => {
  return eventsAPIClient.put(`${PREFIX}/update/${data.id}`, data);
};

/**
 * DELETE /api/v1/events/delete/:id
 *
 * Returns
 * - data
 */
// prettier-ignore
const deleteEvent = (data: DeleteEventInput): Promise<DeleteEventAPIResponse> => {
  return eventsAPIClient.delete(`${PREFIX}/delete/${data.id}`);
};

export default {
  getEvents,
  deleteEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

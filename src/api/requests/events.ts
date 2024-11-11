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

import axios from '@/lib/axios';

const PREFIX = '/events';

/**
 * Request:     GET /api/v1/consumer/events
 * Description: Get all events
 */
export const getEvents = async () => {
  const url = `${PREFIX}`;

  const { data } = await axios.get<GetEventsResponse>(url);

  return data;
};

/**
 * Request:     DELETE /api/v1/consumer/events
 * Description: Delete ALL events
 */
export const deleteEvents = async () => {
  const url = `${PREFIX}`;

  const { data } = await axios.delete<DeleteEventResponse>(url);

  return data;
};

/**
 * Request:     GET /api/v1/consumer/events/:id
 * Description: Get an event by id
 */
export const getEvent = async (data: GetEventRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const { data: responseData } = await axios.get<GetEventResponse>(url);

  return responseData;
};

/**
 * Request:     POST /api/v1/consumer/events
 * Description: Create an event
 */
export const createEvent = async (data: CreateEventRequest) => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axios.post<CreateEventResponse>(
    url,
    data,
  );

  return responseData;
};

/**
 * Request:     PUT /api/v1/consumer/events/:id
 * Description: Update an event
 */
export const updateEvent = async (data: UpdateEventRequest) => {
  const { id, ...rest } = data;
  const url = `${PREFIX}/${id}`;

  const { data: responseData } = await axios.put<UpdateEventResponse>(
    url,
    rest,
  );

  return responseData;
};

/**
 * Request:     DELETE /api/v1/consumer/events/:id
 * Description: Delete an event
 */
export const deleteEvent = async (data: DeleteEventRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const { data: responseData } = await axios.delete<DeleteEventResponse>(url);

  return responseData;
};

import type {
  GetPnmsResponse,
  DeletePnmResponse,
  CreatePnmRequest,
  CreatePnmResponse,
  GetPnmRequest,
  GetPnmResponse,
  UpdatePnmRequest,
  UpdatePnmResponse,
  DeletePnmRequest,
  DeletePnmsResponse,
  DeletePnmsRequest,
} from '@/types';

import axios from '@/lib/axios';

const PREFIX = '/pnms';

/**
 * Request:     GET /api/v1/consumer/pnms
 * Description: Get all PNMs
 */
export const getPnms = async () => {
  const url = `${PREFIX}`;

  const { data } = await axios.get<GetPnmsResponse>(url);

  return data;
};

/**
 * Request      DELETE /api/v1/consumer/pnms
 * Description: Delete all PNMs
 */
export const deletePnms = async (data?: DeletePnmsRequest) => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axios.delete<DeletePnmsResponse>(url, {
    data,
  });

  return responseData;
};

/**
 * Request:     POST /api/v1/consumer/pnms
 * Description: Create a PNM
 */
export const createPnm = async (data: CreatePnmRequest) => {
  const url = `${PREFIX}`;

  const { data: responseData } = await axios.post<CreatePnmResponse>(url, data);

  return responseData;
};

/**
 * Request:     GET /api/v1/consumer/pnms/:id
 * Description: Get a PNM
 */
export const getPnm = async (data: GetPnmRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const { data: responseData } = await axios.get<GetPnmResponse>(url);

  return responseData;
};

/**
 * Request:     PUT /api/v1/consumer/pnms/:id
 * Description: Update a PNM
 */
export const updatePnm = async (data: UpdatePnmRequest) => {
  const { id, ...rest } = data;
  const url = `${PREFIX}/${id}`;

  const { data: responseData } = await axios.put<UpdatePnmResponse>(url, rest);

  return responseData;
};

/**
 * Request:     DELETE /api/v1/consumer/pnms/:id
 * Description: Delete a PNM
 */
export const deletePnm = async (data: DeletePnmRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const { data: responseData } = await axios.delete<DeletePnmResponse>(url);

  return responseData;
};

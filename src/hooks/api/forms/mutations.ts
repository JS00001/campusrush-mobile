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

import { produce } from 'immer';
import { useMutation } from '@tanstack/react-query';

import type {
  CreateFormRequest,
  UpdateFormRequest,
  DeleteFormRequest,
  IForm,
  IFormResponse,
  DeleteFormsRequest,
} from '@/types';

import usePosthog from '@/hooks/usePosthog';
import queryClient from '@/lib/query-client';
import { createForm, updateForm, deleteForm, deleteForms } from '@/api';

interface IGetForm {
  form: IForm;
  responses: IFormResponse[];
}

interface IGetForms {
  forms: IForm[];
}

/**
 * Create a new form, and then take the created form
 * and add it to the forms list in the cache.
 */
export const useCreateForm = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: CreateFormRequest) => {
      const response = await createForm(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (res) => {
      posthog.capture('form_created');
      queryClient.setQueryData<{ forms: IForm[] }>(['forms'], (previous) => {
        if (!previous) return { forms: [res.data.form] };
        return { forms: [...previous.forms, res.data.form] };
      });

      queryClient.invalidateQueries({ queryKey: ['forms'] });
    },
  });
};

/**
 * Update a form, and then optimistically update the form in the cache.
 * At the end, re-fetch the form query itself, because we only optimistically
 * update the forms query
 */
export const useUpdateForm = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: UpdateFormRequest) => {
      const response = await updateForm(data);
      if ('error' in response) throw response;
      return response;
    },
    onMutate: async (data) => {
      // Optimistically update the UI
      await queryClient.cancelQueries({ queryKey: ['forms'] });
      await queryClient.cancelQueries({ queryKey: ['form', data.id] });

      const previousFormsResponse = queryClient.getQueryData<IGetForms>([
        'forms',
      ]);
      const previousFormResponse = queryClient.getQueryData<IGetForm>([
        'form',
        data.id,
      ]);

      queryClient.setQueryData<IGetForms>(['forms'], (oldData) => {
        return produce(oldData, (draft) => {
          if (!draft) return;

          const formIndex = draft.forms.findIndex((f) => f._id === data.id);
          if (formIndex === -1) return;

          draft.forms[formIndex] = { ...draft.forms[formIndex], ...data };
        });
      });

      queryClient.setQueryData<IGetForm>(['form', data.id], (oldData) => {
        return produce(oldData, (draft) => {
          if (!draft) return;

          draft.form = { ...draft.form, ...data };
        });
      });

      return { previousFormResponse, previousFormsResponse };
    },
    onError: (_, variables, context) => {
      // Rollback to previous state
      queryClient.setQueryData<IGetForm>(
        ['form', variables.id],
        context?.previousFormResponse,
      );
      queryClient.setQueryData<IGetForms>(
        ['forms'],
        context?.previousFormsResponse,
      );
    },
    onSettled: async () => {
      posthog.capture('form_updated');
    },
  });
};

/**
 * Delete a form, and then remove the form
 * from the forms list in the cache.
 */
export const useDeleteForm = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data: DeleteFormRequest) => {
      const response = await deleteForm(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['form', variables.id] });
      queryClient.setQueryData<{ forms: IForm[] }>(['forms'], (prev) => ({
        forms: prev?.forms.filter((e) => e._id !== variables.id) || [],
      }));

      posthog.capture('form_deleted');
    },
  });
};

/**
 * Delete multiple forms, and then remove the forms. Set the forms
 * list to the remaining forms in the cache.
 */
export const useDeleteForms = () => {
  const posthog = usePosthog();

  return useMutation({
    mutationFn: async (data?: DeleteFormsRequest) => {
      const response = await deleteForms(data);
      if ('error' in response) throw response;
      return response;
    },
    onSuccess: async (res) => {
      await queryClient.setQueryData(['forms'], { forms: res.data.forms });

      posthog.capture('forms_deleted');
    },
  });
};

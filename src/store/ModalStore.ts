/*
 * Created on Sat Feb 24 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { create } from 'zustand';

import Modal, { ModalProps } from '@/ui_v1/Modal';

/**
 * All modals that can be opened
 * MUST add new modals here for them to be accessible
 */
export const Modals = {
  error: {
    open: false,
    component: Modal,
    props: {
      type: 'error',
      title: 'Error',
      subtitle: 'An error occurred',
      primaryActionLabel: undefined,
      secondaryActionLabel: 'Go Back',
      onPrimaryAction: undefined,
      onSecondaryAction: undefined,
    } as Partial<ModalProps>,
  },
  info: {
    open: false,
    component: Modal,
    props: {
      type: 'info',
      title: 'Info',
      subtitle: 'An info message',
      primaryActionLabel: undefined,
      secondaryActionLabel: 'Go Back',
      onPrimaryAction: undefined,
      onSecondaryAction: undefined,
    } as Partial<ModalProps>,
  },
  warning: {
    open: false,
    component: Modal,
    props: {
      type: 'warning',
      title: 'Warning',
      subtitle: 'A warning message',
      primaryActionLabel: undefined,
      secondaryActionLabel: undefined,
      onPrimaryAction: undefined,
      onSecondaryAction: undefined,
    } as Partial<ModalProps>,
  },
};

interface IModalStore {
  modals: {
    [key: string]: {
      open: boolean;
      component: React.FC<ModalProps>;
      props: Partial<ModalProps>;
    };
  };

  openModal: <T extends keyof typeof Modals>(
    modal: T,
    props: Partial<ModalProps>,
  ) => void;
  closeModal: <T extends keyof typeof Modals>(modal: T) => void;
}

export const useModalStore = create<IModalStore>()((set, get) => {
  /**
   * Initial state for the store
   */
  const initialState = {
    modals: Modals,
  };

  /**
   * Open a modal
   */
  const openModal = <T extends keyof typeof Modals>(
    modal: T,
    props: Partial<ModalProps>,
  ) => {
    set((state) => ({
      modals: {
        ...state.modals,
        [modal]: {
          ...state.modals[modal],
          open: true,
          props: {
            ...state.modals[modal].props,
            ...props,
          },
        },
      },
    }));
  };

  /**
   * Close a modal
   */
  const closeModal = <T extends keyof typeof Modals>(modal: T) => {
    return set((state) => ({
      modals: {
        ...state.modals,
        [modal]: {
          ...state.modals[modal],
          open: false,
        },
      },
    }));
  };

  return {
    ...initialState,
    openModal,
    closeModal,
  };
});

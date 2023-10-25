/*
 * Created on Tue Oct 24 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { create } from "zustand";

import ConfirmDeleteModal from "@/components/Modals/ConfirmDelete";

/**
 * All modals that can be opened
 *
 * MUST add new modals here for them to be accessible
 * Put all bottom sheets in the @/components/Modals folder
 */
export const ModalComponents = {
  /**
   * Confirm delete modal, renders a modal with a "Delete" and "Cancel" button
   */
  CONFIRM_DELETE: {
    open: false,
    component: ConfirmDeleteModal,
    props: {
      message: "Are you sure you want to delete this?",
      onAction: () => {},
    },
  },
};

export interface ModalsState {
  /**
   * The list of modals, whether their open, their component, and the action to
   * take when the main modal action is pressed
   */
  modals: {
    [key: string]: {
      open: boolean;
      component: React.FC<any>;
      props?: any;
    };
  };
  /**
   * Opens a modal from its name
   */
  openModal: <T extends keyof typeof ModalComponents>(input: {
    name: T;
    props: (typeof ModalComponents)[T]["props"];
  }) => void;

  /**
   * Closes a modal from its name
   */
  closeModal: (name: keyof typeof ModalComponents) => void;
}

const useModalsStore = create<ModalsState>()((set) => ({
  /**
   * The list of modals available and whether they are open or not
   */
  modals: ModalComponents,
  /**
   * Opens a modal
   */
  openModal: ({ name, props }) => {
    set((state) => {
      return {
        modals: {
          ...state.modals,
          [name]: {
            ...state.modals[name],
            open: true,
            props,
          },
        },
      };
    });
  },
  /**
   * Closes a modal
   */
  closeModal: (name: keyof typeof ModalComponents) => {
    set((state) => {
      return {
        modals: {
          ...state.modals,
          [name]: {
            ...state.modals[name],
            open: false,
          },
        },
      };
    });
  },
}));

export default useModalsStore;

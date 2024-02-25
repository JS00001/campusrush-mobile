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

import type { ModalProps } from "@/components/Modalsv1/types";

import ErrorModal from "@/components/Modalsv1/Error";
import WarningModal from "@/components/Modalsv1/Warning";
import UpgradeModal from "@/components/Modalsv1/Upgrade";

/**
 * All modals that can be opened
 *
 * MUST add new modals here for them to be accessible
 * Put all bottom sheets in the @/components/Modals folder
 */
export const ModalComponents = {
  /**
   * Error modal, just renders an error icon and a message and a "close" button
   */
  ERROR: {
    open: false,
    component: ErrorModal,
    props: {
      title: "Error",
      subtitle: "This is an error",
      secondaryButtonText: "Go Back",
      secondaryButtonAction: () => undefined,
      primaryButtonText: undefined,
      primaryButtonAction: () => undefined,
    } as Partial<ModalProps>,
  },
  /**
   * Warning modal, just renders a warning icon and a message and a "close" button
   */
  WARNING: {
    open: false,
    component: WarningModal,
    props: {
      title: "Warning",
      subtitle: "This is a warning",
      secondaryButtonText: undefined,
      secondaryButtonAction: () => undefined,
      primaryButtonText: undefined,
      primaryButtonAction: () => undefined,
    } as Partial<ModalProps>,
  },
  /**
   * Upgrade modal, just renders an upgrade icon and a message and a "close" button
   */
  UPGRADE: {
    open: false,
    component: UpgradeModal,
    props: {
      title: "Upgrade for more",
      subtitle: "Upgrade to get more features",
      secondaryButtonText: "No Thanks",
      secondaryButtonAction: undefined,
      primaryButtonText: "Upgrade",
      primaryButtonAction: undefined,
    } as Partial<ModalProps>,
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
            props: {
              ...state.modals[name].props,
              ...props,
            },
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

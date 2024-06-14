/*
 * Created on Sun Feb 25 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

interface IUseSheetFlow<T extends Record<string, any>> {
  /** The list of all of the views in the flow */
  views: React.FC<any>[];
  /** The state of the flow */
  state: T;
  /** Function to snap to a specific index */
  snapToIndex: (index: number) => void;
  /** Function to snap to a specific position */
  snapToPosition: (position: string) => void;
  /** Function to close the bottom sheet */
  handleClose: () => void;
}

export interface UseSheetFlowProps<
  T extends Record<string, any> | undefined = undefined,
> {
  /** The state of the flow */
  state: T;
  /** Function to set the state of the flow */
  setState: Dispatch<SetStateAction<T>>;
  /** Function to set the current view */
  setView: (index: number) => void;
  /** Function to go to the next view */
  nextView: () => void;
  /** Function to go to the previous view */
  prevView: () => void;
  /** Function to close the bottom sheet */
  handleClose: () => void;
  /** Function to snap to a specific index */
  snapToIndex: (index: number) => void;
  /** Function to snap to a specific position */
  snapToPosition: (position: string) => void;
}

const useSheetFlow = <T extends Record<string, any>>({
  views,
  state,
  snapToIndex,
  snapToPosition,
  handleClose,
}: IUseSheetFlow<T>) => {
  const [currentView, setCurrentView] = useState(0);
  const [handledState, setHandledState] = useState(state);

  const onBottomSheetChange = (index: number) => {
    const isClosing = !(index >= 0);

    if (isClosing) {
      setCurrentView(0);
    }
  };

  const nextView = () => {
    setCurrentView((prevIndex) => {
      const nextIndex = prevIndex + 1;

      if (nextIndex < views.length) {
        return nextIndex;
      }

      return prevIndex;
    });
  };

  const prevView = () => {
    setCurrentView((prevIndex) => {
      const nextIndex = prevIndex - 1;

      if (nextIndex >= 0) {
        return nextIndex;
      }

      return prevIndex;
    });
  };

  const props: UseSheetFlowProps<T> = {
    state: handledState,
    nextView,
    prevView,
    setState: setHandledState,
    setView: setCurrentView,
    handleClose,
    snapToIndex,
    snapToPosition,
  };

  return {
    props,
    currentView: views[currentView],
    onBottomSheetChange,
  };
};

export default useSheetFlow;

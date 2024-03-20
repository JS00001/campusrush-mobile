/*
 * Created on Wed Mar 20 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import { useEffect } from 'react';
import { EmitterSubscription, Keyboard, KeyboardEventName } from 'react-native';

const KeyboardEvents: KeyboardEventName[] = [
  'keyboardWillShow',
  'keyboardDidShow',
  'keyboardWillHide',
  'keyboardDidHide',
  'keyboardWillChangeFrame',
  'keyboardDidChangeFrame',
];

interface KeyboardListenerParams {
  onKeyboardWillShow?: () => void;
  onKeyboardDidShow?: () => void;
  onKeyboardWillHide?: () => void;
  onKeyboardDidHide?: () => void;
  onKeyboardWillChangeFrame?: () => void;
  onKeyboardDidChangeFrame?: () => void;
}

const useKeyboardListener = (params: KeyboardListenerParams) => {
  useEffect(() => {
    let listeners: EmitterSubscription[] = [];

    // For each event, check if there is a param passed for it, if so, listen to it
    // and execute the function passed in the param when the event is triggered
    KeyboardEvents.forEach((event) => {
      const onEventName = `on${event[0].toUpperCase()}${event.slice(1)}`;
      const listenerFunction = params[onEventName];

      if (listenerFunction) {
        const listener = Keyboard.addListener(event, () => {
          listenerFunction();
        });

        listeners.push(listener);
      }
    });

    return () => {
      listeners.forEach((listener) => listener.remove());
    };
  }, [params]);
};

export default useKeyboardListener;

/*
 * Created on Fri Mar 15 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

// TODO: Potentially make into a hook

import { useEffect } from "react";
import { EmitterSubscription, Keyboard, KeyboardEventName } from "react-native";

const KeyboardEvents: KeyboardEventName[] = [
  "keyboardWillShow",
  "keyboardDidShow",
  "keyboardWillHide",
  "keyboardDidHide",
  "keyboardWillChangeFrame",
  "keyboardDidChangeFrame",
];

interface KeyboardListenerProps {
  children?: React.ReactNode;
  onKeyboardWillShow?: () => void;
  onKeyboardDidShow?: () => void;
  onKeyboardWillHide?: () => void;
  onKeyboardDidHide?: () => void;
  onKeyboardWillChangeFrame?: () => void;
  onKeyboardDidChangeFrame?: () => void;
}

const KeyboardListener: React.FC<KeyboardListenerProps> = ({
  children,
  ...props
}) => {
  let listeners: EmitterSubscription[] = [];

  useEffect(() => {
    KeyboardEvents.forEach((event) => {
      // check if the event should be listened to (if there is a prop for it)
      const onEventName = `on${event[0].toUpperCase()}${event.slice(1)}`;
      const listenerFunction = (props as any)[onEventName];

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
  }, []);

  return children;
};

export default KeyboardListener;

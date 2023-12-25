/*
 * Created on Mon Dec 25 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useEffect } from "react";
import { Keyboard, KeyboardEventName } from "react-native";

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
  onKeyboardWillShow,
  onKeyboardDidShow,
  onKeyboardWillHide,
  onKeyboardDidHide,
  onKeyboardWillChangeFrame,
  onKeyboardDidChangeFrame,
}) => {
  useEffect(() => {
    KeyboardEvents.forEach((event) => {
      Keyboard.addListener(event, () => {
        switch (event) {
          case "keyboardWillShow":
            onKeyboardWillShow?.();
            break;
          case "keyboardDidShow":
            onKeyboardDidShow?.();
            break;
          case "keyboardWillHide":
            onKeyboardWillHide?.();
            break;
          case "keyboardDidHide":
            onKeyboardDidHide?.();
            break;
          case "keyboardWillChangeFrame":
            onKeyboardWillChangeFrame?.();
            break;
          case "keyboardDidChangeFrame":
            onKeyboardDidChangeFrame?.();
            break;
        }
      });
    });

    return () => {
      KeyboardEvents.forEach((event) => {
        Keyboard.removeAllListeners(event);
      });
    };
  }, []);

  return <>{children}</>;
};

export default KeyboardListener;

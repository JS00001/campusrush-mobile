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

import { Animated, Easing } from "react-native";
import { forwardRef, useImperativeHandle, useState } from "react";

import KeyboardListener from "@/ui/KeyboardListener";

const ExtensionPanel = forwardRef<ExtensionPanelRef, ExtensionPanelProps>(
  ({ visible, setVisible }: ExtensionPanelProps, ref) => {
    const [animation] = useState(new Animated.Value(0));

    const animateContainer = (toValue: number, cb?: () => void) => {
      Animated.timing(animation, {
        toValue,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(() => {
        cb?.();
      });
    };

    /**
     * No matter what, every time that the keyboard is shown, we will animate the container
     * down and set the visibility to false. This is because if they have the panel open, and then it
     * goes away, we do not want it to come back up when the keyboard goes down again, they will
     * have to press the button to open it again.
     */
    const onKeyboardWillShow = () => {
      animateContainer(0, () => setVisible(false));
    };

    /**
     * We must check if the panel is visible before animating it up. Without this check, if the panel
     * is not visible, we will still set its height when they keyboard closes, causing no animation to show when
     * we open the panel again.
     */
    const onKeyboardWillHide = () => {
      if (visible) animateContainer(1);
    };

    useImperativeHandle(ref, () => ({
      animateContainer,
    }));

    return (
      <KeyboardListener
        onKeyboardWillShow={onKeyboardWillShow}
        onKeyboardWillHide={onKeyboardWillHide}
      >
        <Animated.View
          style={{
            display: visible ? "flex" : "none",
            height: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 216],
            }),
            backgroundColor: "green",
          }}
        />
      </KeyboardListener>
    );
  },
);

export default ExtensionPanel;

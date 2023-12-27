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

import tw from "@/lib/tailwind";
import KeyboardListener from "@/ui/KeyboardListener";

const ExtensionPanel = forwardRef<ExtensionPanelRef, ExtensionPanelProps>(
  ({ visible, setVisible }: ExtensionPanelProps, ref) => {
    const [animation] = useState(new Animated.Value(0));

    useImperativeHandle(ref, () => ({
      animateContainer,
      openContainer,
      closeContainer,
    }));

    const animateContainer = (toValue: number, cb?: () => void) => {
      Animated.timing(animation, {
        toValue,
        duration: 150,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(() => {
        cb?.();
      });
    };

    const openContainer = (cb?: () => void) => {
      setVisible(true);
      animateContainer(1, cb);
    };

    const closeContainer = (cb?: () => void) => {
      animateContainer(0, () => {
        setVisible(false);
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

    return (
      <KeyboardListener onKeyboardWillShow={onKeyboardWillShow}>
        <Animated.ScrollView
          style={{
            borderTopColor: tw.color("slate-100"),
            borderTopWidth: 1,
            display: visible ? "flex" : "none",
            height: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 216],
            }),
          }}
        />
      </KeyboardListener>
    );
  },
);

export default ExtensionPanel;

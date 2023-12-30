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

import { Animated, Easing, ScrollView } from "react-native";
import { forwardRef, useImperativeHandle, useState } from "react";

import Tabs from "@/ui/Tabs";
import Event from "@/ui/Event";
import tw from "@/lib/tailwind";
import useEventsStore from "@/state/events";
import KeyboardListener from "@/ui/KeyboardListener";

const ExtensionPanel = forwardRef<ExtensionPanelRef, ExtensionPanelProps>(
  ({ visible, setEvent, setVisible }: ExtensionPanelProps, ref) => {
    const [activeTab, setActiveTab] = useState(0);
    const [animation] = useState(new Animated.Value(0));

    const events = useEventsStore((state) => state.events);

    useImperativeHandle(ref, () => ({
      animateContainer,
      openContainer,
      closeContainer,
    }));

    /**
     * No matter what, every time that the keyboard is shown, we will animate the container
     * down and set the visibility to false. This is because if they have the panel open, and then it
     * goes away, we do not want it to come back up when the keyboard goes down again, they will
     * have to press the button to open it again.
     */
    const onKeyboardWillShow = () => {
      animateContainer(0, () => setVisible(false));
    };

    const animateContainer = (toValue: number, cb?: () => void) => {
      Animated.timing(animation, {
        toValue,
        duration: 175,
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

    const onEventPress = (event: Event) => {
      setEvent(event);
    };

    const containerClasses = tw.style(
      "bg-white p-3 gap-4",
      visible ? "" : "hidden",
      {
        height: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 228],
        }),
      },
    );

    return (
      <KeyboardListener onKeyboardWillShow={onKeyboardWillShow}>
        <Animated.View style={containerClasses}>
          <Tabs
            selectedIndex={activeTab}
            options={["Events", "Photos", "Videos"]}
            disabledIndexes={[1, 2]}
            onChange={setActiveTab}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw`overflow-visible`}
            contentContainerStyle={tw`gap-2`}
          >
            {events.map((event, index) => (
              <Event
                key={index}
                type="card"
                event={event}
                onPress={onEventPress}
              />
            ))}
          </ScrollView>
        </Animated.View>
      </KeyboardListener>
    );
  },
);

export default ExtensionPanel;

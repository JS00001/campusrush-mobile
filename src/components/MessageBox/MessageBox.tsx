/*
 * Created on Thu Oct 5 2023
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2023 CampusRush
 * Do not distribute
 */

import { useRef, useState } from "react";
import { View, TextInput as RNTextInput, Animated, Easing } from "react-native";

import TextInput from "./TextInput";
import TextSuggestions from "./TextSuggestions";

import tw from "@/lib/tailwind";
import AppConstants from "@/constants";
import IconButton from "@/ui/IconButton";
import KeyboardListener from "@/ui/KeyboardListener";
import Walkthroughs from "@/components/Walkthroughs";
import { usePreferences } from "@/providers/Preferences";

interface MessageBoxProps {
  disableSend?: boolean;
  onSend: (message: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({ disableSend, onSend }) => {
  // Component states
  const textInputRef = useRef<RNTextInput>(null);
  const [value, setValue] = useState<string>("");

  // State for the events "bottom sheet"
  const [animation] = useState(new Animated.Value(0));
  const [isEventsVisible, setIsEventsVisible] = useState(false);

  // Providers/external states
  const { messagingTooltipSeen, updatePreferences } = usePreferences();

  const animateContainer = (toValue: number, cb?: () => void) => {
    Animated.timing(animation, {
      toValue,
      duration: 200,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      cb && cb();
    });
  };

  const onEventsPress = () => {
    if (isEventsVisible) {
      textInputRef.current?.focus();
      animateContainer(0, () => setIsEventsVisible(false));
    } else {
      textInputRef.current?.blur();
      setIsEventsVisible(true);
      animateContainer(1);
    }
  };

  const onKeyboardWillShow = () => {
    animateContainer(0);
  };

  const onKeyboardWillHide = () => {
    animateContainer(1);
  };

  // When the send button is pressed, send the message and clear the input
  const onSendPress = () => {
    onSend(value);
    setValue("");
  };

  // When the walkthrough is closed, update the preferences
  const onWalkthroughClose = () => {
    updatePreferences({ messagingTooltipSeen: true });
  };

  const containerClasses = tw.style(
    "flex-row gap-1 px-3 py-2 border-t items-center",
    "border-slate-100 ",
  );

  // Whether or not the send button should be disabled (if there is no message)
  const isButtonDisabled = !value.length || disableSend;

  return (
    <KeyboardListener
      onKeyboardWillShow={onKeyboardWillShow}
      onKeyboardWillHide={onKeyboardWillHide}
    >
      <Walkthroughs.MessageBoxWalkthrough
        isVisible={!messagingTooltipSeen}
        onClose={onWalkthroughClose}
      >
        <TextSuggestions
          value={value}
          setValue={setValue}
          suggestions={AppConstants.messagingKeywords}
        />

        <View style={containerClasses}>
          <IconButton
            size="md"
            icon="ri-calendar-event-line"
            onPress={onEventsPress}
          />

          <TextInput
            passedRef={textInputRef}
            placeholder="Send a message"
            value={value}
            setValue={setValue}
          />
          <IconButton
            size="md"
            icon="ri-send-plane-2-line"
            disabled={isButtonDisabled}
            onPress={onSendPress}
          />
        </View>

        <Animated.View
          style={{
            display: isEventsVisible ? "flex" : "none",
            height: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 216],
            }),
            backgroundColor: "red",
          }}
        />
      </Walkthroughs.MessageBoxWalkthrough>
    </KeyboardListener>
  );
};

export default MessageBox;
